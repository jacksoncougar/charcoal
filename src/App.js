import "./App.css";

import { SocketProvider, useSocket } from "./Pipe";
import { useEffect, useState } from "react";

import EmojiCard from "./Emoji";
import Timer from "./Timer";
import styled from "styled-components";

const Task = styled.div`
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.58);
  background-color: #444;
  color: #afafaf;
  width: calc(5 * 34px + 4 * 8px);
  height: auto;
  margin: 1rem;
  padding: 0.77rem;
  border: 1px solid black;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  gap: 0px 0px;
  grid-template-areas:
    "content"
    "bottom";
`;

const TaskMeta = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  grid-area: "content";

  span {
    display: flex;
    margin-bottom: 2px;
    justify-content: space-between;

    div {
      display: flex;
    }
  }
`;

const TaskTickbox = styled.input`
  display: inline;
  width: 30px; /*Desired width*/
  height: 30px; /*Desired height*/
  align-self: center;
  margin: 0 5px 0 0;
`;

const SmallTickbox = styled.input`
  margin: 0 3px 0 0;
  display: inline;
`;

const TaskTitle = styled.h3`
  display: inline-block;
  margin-block-end: 0;
  margin-block-start: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  position: relative;
  align-self: center;

  color: white;

  &.finished {
    color: #afafaf;
  }
`;

const TaskDescription = styled.p`
  margin-block-end: 0;
  margin-block-start: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  transition: all linear 2s;
  display: flex;

  &.hide {
    display: none;
    transition: all linear 2s;
  }
`;

const Checkmark = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
`;

const CheckmarkList = styled.ol`
  padding: default;
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  display: flex;
  flex-direction: row-reverse;
  gap: 2px;
  grid-area: bottom;
  justify-content: flex-start;
`;

function PomdoroTask() {
  const [units, setUnits] = useState(0);
  const [className, setClassName] = useState("");
  const [hide, setHide] = useState(false);
  const [checked, setChecked] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecked(units === max);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [units]);

  let cards = [];
  const max = 4;
  for (let i = 0; i < units; i++) {
    cards[i] = (
      <Checkmark key={i}>
        <SmallTickbox
          defaultChecked
          checked={true}
          readOnly
          type="checkbox"
        ></SmallTickbox>
      </Checkmark>
    );
  }
  for (let i = units; i < max; i++) {
    cards[i] = (
      <Checkmark key={i}>
        <SmallTickbox type="checkbox" checked={false} readOnly></SmallTickbox>
      </Checkmark>
    );
  }

  let handleChange = (event) => {
    setChecked(true);
    setUnits((units) => Math.min(max, units + 1));
    setClassName("expanded");
  };

  return (
    <>
      <Timer onFinishedCallback={handleChange} />
      <Task className={className}>
        <TaskMeta>
          <span>
            <div>
              {false && (
                <TaskTickbox
                  type="checkbox"
                  value={checked}
                  checked={checked}
                  onChange={handleChange}
                ></TaskTickbox>
              )}
              <TaskTitle
                className={units === max ? "finished" : ""}
                onClick={(e) => {
                  setHide((hide) => !hide);
                }}
              >
                Workout
              </TaskTitle>
            </div>
            {socket}
          </span>
          <TaskDescription className={hide ? "hide" : ""}>
            20 minutes of VR or 100 pushups
          </TaskDescription>
        </TaskMeta>
        <CheckmarkList>{cards}</CheckmarkList>
      </Task>
      <EmojiCard />
    </>
  );
}

function App() {
  return (
    <>
      <SocketProvider>
        <PomdoroTask />
      </SocketProvider>
    </>
  );
}

export default App;
