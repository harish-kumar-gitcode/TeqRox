import { useState, useEffect } from "react";
import "./Header.css";

function Header({ started, setStarted, onTimeUp }) {
  const [mins, setMins] = useState(40);
  const [secs, setSecs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecs((prevSecs) => {
        if (prevSecs > 0) return prevSecs - 1;
        if (mins > 0) {
          setMins((prevMins) => prevMins - 1);
          return 59;
        }

        // 🚨 When timer reaches 0:00
        clearInterval(timer);
        handleTimeUp();
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, mins]);

  // Function to handle what happens when timer runs out
  const handleTimeUp = () => {
    setIsRunning(false);
    setStarted(false);

    if (typeof onTimeUp === "function") {
      onTimeUp(); // notify parent (e.g., QuestionCard) to submit answers
    }

    // Redirect to homepage after slight delay
    setTimeout(() => {
      alert("⏰ Time’s up! Your test has been submitted.");
      window.location.href = "https://teqrox.com";
    }, 1000);
  };

  const handleButtonClick = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStarted(true); // show questions
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
