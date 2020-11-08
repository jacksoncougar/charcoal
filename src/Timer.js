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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Timer(props) {
  let socket = useSocket();
  function startTimer() {
    const endTime = new Date(Date.now());
    //endTime.setMinutes(endTime.getMinutes() + 0);
    endTime.setSeconds(endTime.getSeconds() + 2);

    const timer = setInterval(() => {
      var now = new Date().getTime();
      var distance = endTime - now;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      {
        let mm = minutes.toString().padStart(2, "0");
        let ss = seconds.toString().padStart(2, "0");

        document.getElementById("time").innerHTML = `${mm}:${ss}`;

        if (minutes <= 0 && seconds <= 0) {
          props?.onFinishedCallback();
          clearInterval(timer);
        }
      }
    });
  }

  return (
    <Card
      onClick={(e) => {
        startTimer();
      }}
    >
      <h3 id="time">00:00</h3>
      {socket}
    </Card>
  );
}
