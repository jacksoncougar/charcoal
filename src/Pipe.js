import { useContext, useEffect, useRef, useState } from "react";

import React from "react";
import { SocketComponent } from "./Socket";

export const SocketContext = React.createContext();

export function SocketProvider({ children }) {
  let [pipes, setPipes] = useState([]);
  let [sockets, setSockets] = useState(() => []);
  let [positions, setPositions] = useState(() => []);

  useEffect(() => {
    setPipes([]);
    for (let i = 0, j = 1; j < positions.length; ++i, ++j) {
      const from = positions[i];
      const to = positions[j];

      const pipe = (
        <PipeComponent key={`${i}${j}`} fromSocket={from} toSocket={to} />
      );
      setPipes((old) => [...old, pipe]);
    }
  }, [positions, sockets]);

  return (
    <SocketContext.Provider
      value={{
        addSocket: () => {
          let update = (index, { right, top }) => {
            setPositions((old) => {
              return [
                ...old.slice(0, index),
                { right, top },
                ...old.slice(index + 1),
              ];
            });
          };
          update = update.bind(this, index);
          index++;
          let socket = <SocketComponent socketPosition={update} />;
          setSockets((old) => [...old, socket]);
          setPositions((old) => [...old, {}]);
          return socket;
        },
        removeSocket: (socket) => {
          setSockets((old) => old.filter(socket));
        },
      }}
    >
      <>{pipes}</>
      {children}
    </SocketContext.Provider>
  );
}

var index = 0;

export function useSocket() {
  let [socket, setSocket] = useState();
  const context = useRef(useContext(SocketContext));

  useEffect(() => {
    if (context.current) setSocket(context.current.addSocket());
  }, [context]);

  return socket;
}

export default function PipeComponent(props) {
  const ref = useRef(null);

  let { toSocket, fromSocket } = props;

  useEffect(() => {
    if (!toSocket || !fromSocket || !ref.current) return;

    let to = toSocket;
    let from = fromSocket;

    var c = ref.current;
    var ctx = c.getContext("2d");
    ctx.beginPath();

    function setCanvasSize(canvas, width, height) {
      canvas.width = width;
      canvas.height = height;
    }

    setCanvasSize(c, window.innerWidth, window.innerHeight);

    ctx.fillStyle = "#000000";
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;

    ctx.moveTo(to.right, to.top);
    //URU
    // ctx.bezierCurveTo(
    //   from.right,
    //   to.top,
    //   to.right,
    //   from.top,
    //   from.right,
    //   from.top
    // );
    //RUR
    ctx.moveTo(to.right, to.top);
    ctx.bezierCurveTo(
      to.right,
      from.top,
      from.right,
      to.top,
      from.right,
      from.top
    );
    ctx.stroke();
  }, [toSocket, fromSocket, ref]);

  let RefCanvas = React.forwardRef((props, ref) => (
    <>
      <canvas
        ref={ref}
        style={{ position: "absolute", top: 0, left: 0 }}
      ></canvas>
    </>
  ));

  return <RefCanvas ref={ref} />;
}
