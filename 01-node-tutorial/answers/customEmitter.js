const EventEmitter = require("events");
// Create a new emitter instance
const customEmitter = new EventEmitter();
// Event handler for 'students' event
customEmitter.on("Students", (name, age) => {
  console.log(`Hello, my name is ${name}! I am ${age} years old.`);
});

customEmitter.on("Students", () => {
  console.log(`There was no student name or age passed to this event.`);
});

// Event handler for 'timer' event
customEmitter.on("timer", (message) => {
  console.log(`Timer event: ${message}`);
  // Emit a new event after a delay
  setTimeout(() => {
    customEmitter.emit("delayedEvent", "This event was delayed for 4 seconds!");
  }, 4000);
});

// Event handler for 'delayedEvent' event
customEmitter.on("delayedEvent", (message) => {
  console.log(`Delayed event: ${message}`);
});

// Emit 'greeting' event with parameters
customEmitter.emit("Students", "Doina", 30);

// Emit 'timer' event every 2 seconds
setInterval(() => {
  customEmitter.emit("timer", "Timer event triggered!");
}, 3000);

// Asynchronous event handling
const waitForEvent = () => {
  return new Promise((resolve) => {
    customEmitter.once("asyncEvent", (message) => resolve(message));
  });
};

const handleAsyncEvent = async () => {
  const message = await waitForEvent();
  console.log(`Async event was received: ${message}`);
};

handleAsyncEvent();

// Emit 'asyncEvent' after a delay
setTimeout(() => {
  customEmitter.emit("asyncEvent", "This is an asynchronous event!");
}, 5000);
