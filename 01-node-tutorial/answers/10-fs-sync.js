const { writeFileSync, readFileSync } = require("fs");

writeFileSync("./temporary/fileA.txt", "Here is the first line", { flag: "a" });
writeFileSync("./temporary/fileA.txt", "Here is the second line", {
  flag: "a",
});
writeFileSync("./temporary/fileA.txt", "Here is the third line", { flag: "a" });

const fileContent = readFileSync("./temporary/fileA.txt", "utf8");

console.log(fileContent);
