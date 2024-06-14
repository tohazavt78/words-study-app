import React, { useCallback, useState } from "react";
import axios from "axios";
import MainContainer from "../components/MainContainer"
import styles from "../styles/Words.module.css"

interface Word {
  word: string;
  translation: string;
}

 const Words = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message: React.SetStateAction<string>) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const addWord = useCallback(() => {
    if (word === "" || translation === "") {
      showToast("Пожалуйста, введите слово и его перевод");
      return;
    }

    axios.post("/api/words", { word, translation }).then((response) => {
      setWords((prevWords) => [...prevWords, response.data]);
      setWord("");
      setTranslation("");
      showToast("Слово добавлено");
    });
  }, [word, translation, words]);
   return (
  <MainContainer>
    <div className={styles.containerWords}>
      <div className={styles.newWords}>
        <p className={styles.text}>Слово</p>
        <input className={styles.input}
          type="text"
          onChange={(e) => setWord(e.target.value)}
          value={word}
        />
      </div>
      <div className={styles.newWords}>
        <p className={styles.text}>Перевод</p>
        <input className={styles.input}
          type="text"
          onChange={(e) => setTranslation(e.target.value)}
          value={translation}
        />
      </div>
      <button className={styles.confirm} onClick={addWord}>
        <p className={styles.confirmText}>Добавить</p>
      </button>
      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
    </div>
  </MainContainer>
  );
};

export default Words;