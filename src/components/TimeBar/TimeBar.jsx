import { useEffect, useRef, useState } from "react";
import "./TimeBar.scss";

function TimeBar() {
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((value) => value + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="time-bar-container">
      <div className="progress">{counter}</div>
    </div>
  );
}

export default TimeBar;
