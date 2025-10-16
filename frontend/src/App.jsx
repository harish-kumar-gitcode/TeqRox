import { useState, useRef } from "react";
import Header from "./components/Header";
import QuestionCard from "./components/QuestionCard";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const submitRef = useRef(null); // Ref to trigger QuestionCard submission from Header

  return (
    <>
      <Header started={started} setStarted={setStarted} submitRef={submitRef} />
      {started && <QuestionCard submitRef={submitRef} />}
    </>
  );
}

export default App;
