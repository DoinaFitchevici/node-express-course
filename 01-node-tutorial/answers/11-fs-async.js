const { writeFile } = require("fs");

console.log("At start");

writeFile("./temporary/fileB.txt", "This is line 1", (err, result) => {
  console.log("At point 1");
  if (err) {
    console.log("This error happened: ", err);
    return;
  }
  writeFile(
    "./temporary/fileB.txt",
    "This is line 2",
    { flag: "a" },
    (err, result) => {
      console.log("At point 2");
      if (err) {
        console.log("This error happened: ", err);
        return;
      }
      writeFile(
        "./temporary/fileB.txt",
        "This is line 3",
        { flag: "a" },
        (err, result) => {
          console.log("At point 3");
          if (err) {
            console.log("This error happened: ", err);
            return;
          }
          console.log("File has been written successfully!");
        }
      );
    }
  );
});
