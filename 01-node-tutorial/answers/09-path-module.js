const path = require("path");

const part1 = "folder";
const part2 = "subfolder";
const part3 = "first.txt";

const joinedPath = path.join(part1, part2, part3);
console.log("Joined Path:", joinedPath);
