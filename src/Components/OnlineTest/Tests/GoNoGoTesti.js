import React, { useState, useEffect, useCallback } from "react";

const GoNoGoTest = () => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const randomNumber = () => {
    const randomno = Math.floor(Math.random() * 2) + 1;
    if (randomno === 1) {
      return "Go";
    } else {
      return "No-Go";
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 32) {
        if (showNumber) {
          clearTimeout(timerId);
          setReactionTime(Date.now() - startTime);
          setShowNumber(false);
        } else {
          const number = randomNumber();
          setCurrentNumber(number);
          setShowNumber(true);
          setStartTime(Date.now());
          if (number === "No-Go") {
            const id = setTimeout(() => {
              setShowNumber(false);
              setReactionTime(null);
              setTimerId(null);
            }, 1500);
            setTimerId(id);
          }
        }
      }
    },
    [showNumber, setCurrentNumber, setShowNumber, startTime, timerId]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timerId);
    };
  }, [handleKeyDown, timerId]);

  const handleStartTest = () => {
    setCurrentNumber(randomNumber());
    setTestStarted(true);
  };

  return (
    <div>
      <h2>Go/No-Go Testi</h2>
      {!testStarted && <button onClick={handleStartTest}>Teste Başla</button>}
      {testStarted && (
        <>
          <p>Başlık.</p>
          {showNumber && <h1>{currentNumber}</h1>}
          {reactionTime && (
            <p>
              Tepki süreniz: <strong>{reactionTime} ms</strong>
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default GoNoGoTest;
