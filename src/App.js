import { ReactComponent as Icon } from "./check_circle-24px.svg";
import "./App.css";
import styled from "styled-components";
import { useState } from "react";

const Task = styled.div`
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

const TaskDescription = styled.h3`
  grid-area: content;
`;

const Checkmark = styled.div`
  width: 16px;
  height: 16px;
  background-color: #aaa;
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
  gap: 2px;
  grid-area: bottom;
  justify-content: flex-end;
`;

const StyledIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  color: green;
  object-fit: contain;

  & path:nth-child(2) {
    stroke: lightseagreen;
  }
`;

function PomdoroTask({ children }) {
  const [units, setUnits] = useState(0);
  const [className, setClassName] = useState("");

  let cards = [];
  for (let i = 0; i < units; i++) {
    cards[i] = (
      <Checkmark>
        <StyledIcon />
      </Checkmark>
    );
  }
  return (
    <Task
      className={className}
      onClick={(e) => {
        setUnits((units) => Math.min(4, units + 1));
        setClassName("expanded");
      }}
    >
      <TaskDescription>Workout</TaskDescription>
      <CheckmarkList>{cards}</CheckmarkList>
    </Task>
  );
}

function App() {
  return <PomdoroTask />;
}

export default App;
