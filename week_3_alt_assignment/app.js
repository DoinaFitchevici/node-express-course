const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/word-scramble", (req, res) => {
  const scrambledWord = "rdwlo";
  const answer = "world";
  const userAnswer = req.query.answer;

  if (userAnswer === answer) {
    res.send("Congratulations! You unscrambled the word correctly!");
  } else if (userAnswer) {
    res.send("Sorry, that's not quite right. Try again!");
  } else {
    res.send("Please enter your answer in the URL.");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
