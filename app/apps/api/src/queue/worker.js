const { Worker } = require("bullmq");
const redisConnection = require("../config/redis");
const Task = require("../models/task.model");

const worker = new Worker(
  "task-processing",
  async (job) => {
    const { taskId } = job.data;

    const task = await Task.findById(taskId);

    if (!task) return;

    await Task.updateOne({ _id: taskId }, { status: "running" });

    let result = "";

    switch (task.operation) {
      case "uppercase":
        result = task.inputText.toUpperCase();
        break;
      case "lowercase":
        result = task.inputText.toLowerCase();
        break;
      case "reverse":
        result = task.inputText.split("").reverse().join("");
        break;
      case "word_count":
        result = task.inputText.split(" ").length.toString();
        break;
    }

    await Task.updateOne(
      { _id: taskId },
      {
        status: "success",
        result,
      }
    );

    console.log("Processed task", taskId);
  },
  { connection: redisConnection }
);

console.log("BullMQ worker started");