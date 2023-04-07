import React from "react";
import "./beckdepresyontesti.css";
import { questions } from "../questions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../Navbar";

export default function BeckDepresyonTesti() {
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
        position: "absolute",
        top: "0%",
        left: "0%",
        backgroundSize: "100%",
      }}
    >
      <Navbar />
      <img
        src="https://source.unsplash.com/random/1920x1080/?landscape"
        alt=""
      ></img>

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