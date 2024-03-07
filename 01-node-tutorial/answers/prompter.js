const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessNumber = "";
let numberOfGuesses = 0;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <p>${guessNumber}</p>
  <p>Number of Guesses: ${numberOfGuesses}</p>
  <form method="POST">
  <input type="number" name="guess" min="1" max="100" required></input>
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);

      if (body["guess"]) {
        const userGuess = parseInt(body["guess"], 10);

        if (!isNaN(userGuess)) {
          numberOfGuesses++;

          if (userGuess === randomNumber) {
            guessNumber = "Congratulations! You guessed the correct number.";
            randomNumber = Math.floor(Math.random() * 100) + 1; // Reset the random number
            numberOfGuesses = 0; // Reset the number of guesses
          } else if (userGuess < randomNumber) {
            guessNumber = "Too low! Try again.";
          } else {
            guessNumber = "Too high! Try again.";
          }
        } else {
          guessNumber = "Invalid input. Please enter a number.";
        }
      } else {
        guessNumber = "Nothing was entered.";
      }

      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});

server.listen(3000);
console.log("The server is listening on port 3000.");
