const taskQueue = require("./task.queue");

async function enqueueTask(task) {
  return taskQueue.add(
    "process-task",
    {
      taskId: task._id.toString(),
      userId: task.userId.toString(),
      operation: task.operation,
    },
    {
      jobId: task._id.toString(),
    }
  );
}

module.exports = { enqueueTask };