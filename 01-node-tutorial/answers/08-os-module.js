const os = require("os");

const user = os.userInfo();
console.log(user);

console.log("Available Parallelism:", os.availableParallelism());
console.log("Architecture:", os.arch());
console.log("CPUs:", os.cpus());
console.log("Free Memory:", os.freemem());
console.log("Home Directory:", os.homedir());
console.log("Hostname:", os.hostname());
console.log("Network Interfaces:", os.networkInterfaces());
console.log("Platform:", os.platform());
console.log("Release:", os.release());
console.log("Total Memory:", os.totalmem());
console.log("Operating System Type:", os.type());
console.log("Uptime:", os.uptime());
console.log("OS Version:", os.version());
