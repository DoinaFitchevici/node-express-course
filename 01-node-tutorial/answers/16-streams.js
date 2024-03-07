const { createReadStream } = require("fs");

const readStream = createReadStream("../content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

let counter = 0;

readStream.on("data", (result) => {
  counter++;
  console.log(`Chunk received: ${result.length}`);
});

readStream.on("end", () => {
  console.log(`Total chunks received: ${counter}`);
});

readStream.on("error", (err) => {
  console.log(`Error occurred: ${err}`);
});
