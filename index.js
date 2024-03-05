const { Worker } = require("worker_threads");

const tasks = Array.from({ length: 100 }, () => 1e9);

// Without worker threads
// const start = performance.now();

// Simulating a CPU-intensive operation
// for (let task of tasks) {
//   let count = 0;

//   for (let i = 0; i < task; i++) {
//     count++;
//   }
// }

// const end = performance.now();
// console.log(`The main thread took ${end - start} ms`);

// Performing the same operation with worker threads
// createChunks() splits the array into subarrays equal to no. of workers
function createChunks(array, n) {
  let chunks = [];

  for (let i = n; i > 0; i--) {
    chunks.push(array.splice(0, Math.ceil(array.length / i)));
  }

  return chunks;
}

function main(tasks, workers) {
  const chunks = createChunks(tasks, workers);

  const start = performance.now();

  let completedWorkers = 0;

  chunks.forEach((data, i) => {
    const worker = new Worker("./worker.js");
    // Send message containing data to the worker thread
    worker.postMessage(data);

    // Listen message from the worker thread
    worker.on("message", () => {
      console.log(`Worker ${i} has completed its work.`);

      completedWorkers++;

      if (completedWorkers === workers) {
        console.log(`${workers} workers took ${performance.now() - start} ms`);

        process.exit();
      }
    });
  });
}

main(tasks, 4); // 4 worker threads
