const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    await writeFile("./temporary/temp.txt", "Line 1\nLine 2\nLine 3");
    console.log("File written successfully");
  } catch (err) {
    console.error("Error writing file:", err);
  }
};

const reader = async () => {
  try {
    const data = await readFile("./temporary/temp.txt", "utf8");
    console.log("File contents:", data);
  } catch (err) {
    console.error("Error reading file:", err);
  }
};

const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();
