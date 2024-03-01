const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to the home page!");
  } else if (req.url === "/about") {
    res.end("A little bit about us.");
  } else if (req.url === "/contact") {
    res.end("Contact us at example@email.com");
  } else {
    res.end(`
  <h1>404 Not Found</h1>
  <a href="/">Back home!</a>
  `);
  }
});

server.listen(3000);
