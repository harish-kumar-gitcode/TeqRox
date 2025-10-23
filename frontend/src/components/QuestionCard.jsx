import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import "./QuestionCard.css";

const QuestionCard = forwardRef(({ submitRef }, ref) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  // Fetch questions
  useEffect(() => {
    fetch("https://teqrox.onrender.com/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  const handleOptionSelect = (index, optionText) => {
    setAnswers((prev) => ({
      ...prev,
      [`Question ${index + 1}`]: optionText,
    }));
  };

  const submitAnswers = async () => {
    console.log("Submitting answers:", answers);
    try {
      await fetch("https://teqrox.onrender.com/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      alert("Quiz completed!");
      window.location.href = "https://teqrox.com";
    } catch (err) {
      console.error("Error submitting answers:", err);
      alert("Error submitting answers. Redirecting anyway.");
      window.location.href = "https://teqrox.com";
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitAnswers(); // Only Finish button triggers submission
    }
  };

  if (loading) return <div>Loading...</div>;
if (!Array.isArray(questions) || !questions.length)
  return <div>No questions available.</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="outer-cont">
      <div className="ques-count">
        <h2>Question {currentIndex + 1}</h2>
        <p>
          {currentIndex + 1}/{questions.length}
        </p>
      </div>

      <div className="question">
        <h2>{currentQuestion.questionText}</h2>
        <div className="options">
          {currentQuestion.options.map((option) => (
            <label key={option.id || option.text}>
              <input
                type="radio"
                name={`question-${currentIndex}`}
                value={option.text}
                checked={
                  answers[`Question ${currentIndex + 1}`] === option.text
                }
                onChange={() => handleOptionSelect(currentIndex, option.text)}
              />
              {option.text}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!answers[`Question ${currentIndex + 1}`]}
        id="next-btn"
      >
        {currentIndex === questions.length - 1 ? "Finish →" : "Next →"}
      </button>
    </div>
  );
});

export default QuestionCard;
