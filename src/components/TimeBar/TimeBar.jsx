import { useEffect, useRef, useState } from "react";
import "./TimeBar.scss";

function TimeBar({ duration, onTimeUp }) {
  const [counter, setCounter] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((value) => value + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setProgress((100 * counter) / duration);
    if (counter === duration) {
      clearInterval(intervalRef.current);

      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
  }, [counter]);

  const getBgColor = () => {
    return progress < 40 ? "lightgreen" : progress < 70 ? "orange" : "red";
  };

  return (
    <div className="time-bar-container">
      <div
        className="progress"
        style={{
          width: `${progress}%`,
          backgroundColor: `${getBgColor()}`,
        }}
      ></div>
    </div>
  );
}

export default TimeBar;
