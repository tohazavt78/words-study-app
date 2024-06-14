import React, { useCallback, useState } from "react";
import axios from "axios";
import MainContainer from "../components/MainContainer"
import styles from "../styles/Quiz.module.css"

interface Word {
  word: string;
  translation: string;
}

 const Quiz = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [quizWords, setQuizWords] = useState<Word[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startQuiz = async () => {
    setIsQuizStarted(true);
    const response = await axios.get("/api/words");
    const shuffledWords = response.data.sort(() => 0.5 - Math.random());
    setQuizWords(shuffledWords.slice(0, 20));
    setCurrentIndex(0);
  };

  const checkAnswer = () => {
    if (
      quizWords[currentIndex] &&
      userAnswer === quizWords[currentIndex].translation
    ) {
      setMessage("Ура!");
      setIsCorrect(true);
      setTimeout(() => {
        setMessage("");
        if (currentIndex + 1 < quizWords.length) {
          setCurrentIndex(currentIndex + 1);
          setUserAnswer("");
        } else {
          alert("Тест завершён");
          setIsQuizStarted(false);
          setUserAnswer(""); 
        }
      }, 3000);
    } else {
      setMessage("Неверно, попробуйте снова");
      setIsCorrect(false);
    }
  };
    const closeMessage = () => {
    setMessage("");
  };

  return (
    <MainContainer>
    <div className= {styles.containerQuiz}>
      {!isQuizStarted ? (
        <button className={styles.quizButton} onClick={startQuiz}>Начать тест</button>
      ) : (
        <>
          <p className={styles.quizWord}>Слово</p>
          <input className={styles.question}
            type="text"
            readOnly
            value={quizWords[currentIndex] ?.word || ""}
          />
          <input className={styles.answer}
            type="text"
            onChange={(e) => setUserAnswer(e.target.value)}
            value={userAnswer}
            placeholder="Введите перевод"
          />
          <button className={styles.check} onClick={checkAnswer}>Проверить</button>
          {message && (
            <div className={styles.quizMessage}>
              {isCorrect ? (
                <p className={styles.success}>{message}</p>
              ) : (
                <p className={styles.error}>
                  {message} <button className={styles.close} onClick={closeMessage}>X</button>
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
    </MainContainer>
  );
};

export default Quiz
