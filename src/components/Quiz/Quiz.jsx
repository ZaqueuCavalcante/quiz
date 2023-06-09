import { useState } from "react";
import "./Quiz.scss";
import TimeBar from "../TimeBar/TimeBar";

function Quiz({ questions }) {
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [correctsCounter, setCorrectsCounter] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showTimeBar, setShowTimeBar] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const { question, choices, type, correctAnswer } =
    questions[currentQuestionId];

  const onAnswerClick = (answer, index) => {
    setAnswerIndex(index);
    setCorrect(answer === correctAnswer);
  };

  const onButtonClick = () => {
    setAnswerIndex(null);
    setShowTimeBar(false);
    if (correct) {
      setCorrectsCounter((value) => value + 1);
    }
    setCorrect(null);

    if (currentQuestionId === questions.length - 1) {
      setShowResult(true);
      setCurrentQuestionId(0);
      setInputValue("");
    }

    setCurrentQuestionId((value) => value + 1);

    setTimeout(() => {
      setShowTimeBar(true);
    });
  };

  const onTryAgainClick = () => {
    setAnswerIndex(null);
    setShowResult(false);
    setCorrect(null);
    setCorrectsCounter(0);
    setCurrentQuestionId(0);
  };

  const handleTimeUp = () => {
    setAnswerIndex(null);
    setShowTimeBar(false);

    setCorrect(null);

    if (currentQuestionId === questions.length - 1) {
      setShowResult(true);
      setCurrentQuestionId(0);
      setInputValue("");
    }

    setCurrentQuestionId((value) => value + 1);

    setTimeout(() => {
      setShowTimeBar(true);
    });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setCorrect(event.target.value === correctAnswer);
  };

  const getAnswerUI = () => {
    if (type === "FIB") {
      return <input value={inputValue} onChange={handleInputChange} />;
    }
    return (
      <ul>
        {choices.map((answer, index) => {
          return (
            <li
              key={index}
              onClick={() => onAnswerClick(answer, index)}
              className={answerIndex === index ? "selected-answer" : null}
            >
              {answer}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result-card">
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Corrects: <span>{correctsCounter}</span>
          </p>
          <p>
            Wrongs: <span>{questions.length - correctsCounter}</span>
          </p>
          <button onClick={() => onTryAgainClick()}>Try Again</button>
        </div>
      ) : (
        <>
          {showTimeBar && (
            <TimeBar duration={5} onTimeUp={handleTimeUp}></TimeBar>
          )}
          <>
            <span className="active-question-id">{currentQuestionId + 1}</span>
            <span className="total-questions">/{questions.length}</span>
            <h2>{question}</h2>
          </>
          <>{getAnswerUI()}</>
          <>
            <div className="footer">
              <button
                onClick={() => onButtonClick()}
                disabled={answerIndex === null && !inputValue}
              >
                {currentQuestionId === questions.length - 1 ? "FINISH" : "NEXT"}
              </button>
            </div>
          </>
        </>
      )}
    </div>
  );
}

export default Quiz;
