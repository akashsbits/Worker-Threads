const { parentPort } = require("worker_threads");

// Listen message from the main(parent) thread
parentPort.on("message", (tasks) => {
  for (let task of tasks) {
    let count = 0;

    for (let i = 0; i < task; i++) {
      count++;
    }
  }

  // Notify the main(parent) thread about the work completion
  parentPort.postMessage("done");
});
