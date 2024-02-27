console.log("__dirname", __dirname);
console.log("process.env.MY_VAR", process.env.MY_VAR);

setTimeout(() => {
  console.log("Timeout is set to 2 second");
}, 2000);
