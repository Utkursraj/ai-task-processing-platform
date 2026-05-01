const crypto = require("crypto");
const Task = require("../../models/task.model");
const TaskLog = require("../../models/task-log.model");
const ApiError = require("../../utils/api-error");
const { enqueueTask } = require("../../queue/task.producer");

function createIdempotencyKey(userId, title, inputText, operation) {
  return crypto
    .createHash("sha256")
    .update(`${userId}:${title}:${inputText}:${operation}`)
    .digest("hex");
}

async function createTask(userId, payload) {
  const { title, inputText, operation } = payload;

  const idempotencyKey = createIdempotencyKey(
    userId,
    title,
    inputText,
    operation
  );

  let task = await Task.findOne({ idempotencyKey });

  if (task) {
    return task;
  }

  task = await Task.create({
    userId,
    title,
    inputText,
    operation,
    idempotencyKey,
  });

  await TaskLog.create({
    taskId: task._id,
    level: "info",
    message: "Task created",
    meta: { status: task.status },
  });

  await enqueueTask(task);

  return task;
}

async function listTasks(userId, query) {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Math.max(Number(query.limit || 10), 1), 50);
  const skip = (page - 1) * limit;

  const filter = { userId };

  if (query.status) {
    filter.status = query.status;
  }

  const [items, total] = await Promise.all([
    Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Task.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

async function getTaskById(userId, taskId) {
  const task = await Task.findOne({ _id: taskId, userId });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
}

async function getTaskLogs(userId, taskId) {
  await getTaskById(userId, taskId);

  return TaskLog.find({ taskId }).sort({ createdAt: 1 });
}

module.exports = {
  createTask,
  listTasks,
  getTaskById,
  getTaskLogs,
};