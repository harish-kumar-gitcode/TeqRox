import { useState, useRef } from "react";
import Header from "./components/Header";
import QuestionCard from "./components/QuestionCard";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import { Routes } from "react-router-dom";

function App() {
  const [started, setStarted] = useState(false);
  const submitRef = useRef(null); // Ref to trigger QuestionCard submission from Header

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header
              started={started}
              setStarted={setStarted}
              submitRef={submitRef}
            />
            {started && <QuestionCard submitRef={submitRef} />}
          </>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
