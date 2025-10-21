import { useState, useEffect } from "react";
import "./Header.css";

function Header({ started, setStarted, onTimeUp }) {
  // 🕒 Add hours in state
  const [hours, setHours] = useState(1); // example: 1 hour timer
  const [mins, setMins] = useState(30);
  const [secs, setSecs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecs((prevSecs) => {
        if (prevSecs > 0) return prevSecs - 1;

        // seconds reached 0
        if (mins > 0) {
          setMins((prevMins) => prevMins - 1);
          return 59;
        }

        // minutes reached 0
        if (hours > 0) {
          setHours((prevHours) => prevHours - 1);
          setMins(59);
          return 59;
        }

        // 🚨 When hours, mins, and secs all reach 0
        clearInterval(timer);
        handleTimeUp();
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, hours, mins]);

  // ⏰ When time is up
  const handleTimeUp = () => {
    setIsRunning(false);
    setStarted(false);

    if (typeof onTimeUp === "function") {
      onTimeUp(); // notify parent to submit answers
    }

    setTimeout(() => {
      alert("⏰ Time’s up! Your test has been submitted.");
      window.location.href = "https://teqrox.com";
    }, 1000);
  };

  const handleButtonClick = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStarted(true);
    }
  };

  return (
    <div className="header">
      <img src="/teqrox_logo.png" alt="Logo" />
      <div className="title">
        <p>Final Assessment</p>
      </div>
      <div className="submit-cont">
        <div className="time">
          <p>
            Time Left:{" "}
            <span>
              {hours.toString().padStart(2, "0")}:
              {mins.toString().padStart(2, "0")}:
              {secs.toString().padStart(2, "0")}
            </span>
          </p>
        </div>
        <button onClick={handleButtonClick} disabled={isRunning}>
          {isRunning ? "Started" : "Start"}
        </button>
      </div>
    </div>
  );
}

export default Header;
