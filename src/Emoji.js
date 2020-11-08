import { useEffect, useState } from "react";

import styled from "styled-components";
import { useSocket } from "./Pipe";

const Card = styled.div`
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

export default function EmojiCard(props) {
  let [emojis, setEmojis] = useState(new Map());
  let socket = useSocket();
  let socket2 = useSocket();

  useEffect(() => {
    setEmojis(() => {
      let val = new Map();
      val.set(0, "😢");
      val.set(1, "🙂");
      val.set(2, "😃");
      val.set(2, "😍");
      return val;
    });
  }, []);

  return (
    <Card>
      {emojis.get(0)}
      {socket}
      <div style={{ float: "right", margin: "auto" }}>{socket2}</div>
    </Card>
  );
}
