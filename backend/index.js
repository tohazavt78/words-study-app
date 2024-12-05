const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

app.get("/api/words", (_req, res) => {
  fs.readFile("words.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
    res.send(JSON.parse(data));
  });
});

app.post("/api/words", (req, res) => {
  const newWord = req.body;
  fs.readFile("words.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
    const words = JSON.parse(data);
    words.push(newWord);
    fs.writeFile("words.json", JSON.stringify(words), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      res.send(newWord);
    });
  });
});

app.delete("/api/words/:word", (req, res) => {
  const wordToDelete = req.params.word;
  fs.readFile("words.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
    let words = JSON.parse(data);
    words = words.filter((word) => word.word !== wordToDelete);
    fs.writeFile("words.json", JSON.stringify(words), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      res.send({ message: `Слово ${wordToDelete} успешно удалено` });
    });
  });
});

app.listen(5000, () => console.log("Server started on port 5000"));
