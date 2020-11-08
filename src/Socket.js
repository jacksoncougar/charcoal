import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

let Socket = styled.div`
  display: flex;
`;
let SocketIcon = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  background-color: #3a3a3a;
  box-shadow: inset 0 0 3px #00000055;

  margin: 0 3px 3px 0;
  border-radius: 50px;
`;

let SocketLabel = styled.span`
  color: indianred;
  font-size: smaller;
  margin-right: 0.667rem;
`;

function useForceUpdate() {
  const [state, setState] = useState(0);
  return () => setState((old) => old + 1);
}

export function SocketComponent(props) {
  let ref = useRef();
  let [last, setLast] = useState({ right: undefined, top: undefined });

  let RefSocket = React.forwardRef((props, ref) => (
    <Socket>
      {props.label && <SocketLabel>{props?.label ?? "in/out"}</SocketLabel>}
      <SocketIcon ref={ref} />
    </Socket>
  ));

  let { socketPosition, update } = props;
  useEffect(() => {
    let socket = ref.current;
    let rec = socket?.getBoundingClientRect();
    if (rec) {
      let position = {
        right: rec.left + rec.width / 2,
        top: rec.top + rec.height / 2,
      };
      if (last.right !== position.right && last.top !== position.top) {
        setLast(position);
        socketPosition(position);
      }
    }
  }, [last, socketPosition, update]);

  return <RefSocket ref={ref} />;
}
