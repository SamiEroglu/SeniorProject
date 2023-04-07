import React from "react";
import "./testPage.css";
import { questions } from "./questions";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  let navigate = useNavigate();
  const routeChange2 = () => {
    navigate("/home");
  };
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);

  const handleClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div
      className="testpagecont"
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage:
          "url(https://source.unsplash.com/random/1920×1080/?landscape,1920x1080)",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        top: "0%",
        left: "0%",
        backgroundSize: "100%",
      }}
    >
      <li
        style={{
          color: "white",
          cursor: "pointer",
          width: "11%",
          fontFamily: "sans-serif",
          fontSize: "3vh",
          listStyleType: "none",
          position: "absolute",
          top: "5%",
          left: "3%",
          textShadow:
            "5px 5px 5px rgba(0,0,0,0.3), 0px -2px 3px rgba(255,255,255,0.3)",
          zIndex: "3",
        }}
        onClick={routeChange2}
      >
        &lt;&nbsp; Ana Sayfa
      </li>
      <div className="testpage">
        {showScore ? (
          <section className="showScore-section">
            <h1>Sonuç: {21 - score}</h1>
            <h1>0-5: Normal düzeyi gösterir</h1>
            <h1>5-9: Hafif düzeyde depresyon belirtisini gösterir</h1>
            <h1>9-14: Orta düzeyde depresyonu gösterir</h1>
            <h1>14-21: Şiddetli depresyon belirtisini gösterir</h1>
            <FontAwesomeIcon
              onClick={refreshPage}
              icon={faRefresh}
              className="refreshicon"
            />
          </section>
        ) : (
          <>
            <section className="question-section">
              <h1>
                Soru: {currentQuestion + 1}/{questions.length}
              </h1>
              <p>{questions[currentQuestion].questionText}</p>
            </section>

            <section className="answer-section">
              {questions[currentQuestion].answerOptions.map((item) => (
                <button onClick={() => handleClick(item.isCorrect)}>
                  {item.answerText}
                </button>
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
