import { useEffect, useState } from "react";
import axios from "axios";
import MainContainer from "../components/MainContainer"
import styles from "../styles/Dictionary.module.css"

interface Word {
  word: string;
  translation: string;
}

 const Dictionary = () => {
  const [words, setWords] = useState<Word[]>([]);

  const deleteWord = (wordToDelete: string) => {
    axios
      .delete(`/api/words/${wordToDelete}`)
      .then(() => {
        setWords(words.filter((word) => word.word !== wordToDelete));
      })
      .catch((error) => console.error("Ошибка:", error));
  };

  useEffect(() => {
    axios.get("/api/words").then((response) => {
      setWords(response.data);
    });
  }, []);

  return (
    <MainContainer>
    <div className={styles.containerDictionary}>
      {words.length === 0 ? (
        <div className={styles.containerMessage}>
          <p className={styles.message}>Слов нет</p>
          <button className={styles.addButton} onClick={() => (window.location.href = "Words")}>
            Добавить слово
          </button>{" "}
        </div>
      ) : (
        <div className={styles.tableContainer}> 
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                <th className={styles.th}>Слово</th>
                <th className={styles.th}>Перевод</th>
                <th className={styles.th}>Действие</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {words.map((word, index) => (
                <tr className={styles.tr} key={index}>
                  <td className={styles.td}>{word.word}</td>
                  <td className={styles.td}>{word.translation}</td>
                  <td className={styles.td}>
                    <button className={styles.tdButton} onClick={() => deleteWord(word.word)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </MainContainer>
  );
};

export default Dictionary