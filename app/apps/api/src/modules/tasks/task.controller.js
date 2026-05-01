const asyncHandler = require("../../utils/async-handler");
const {
  createTask,
  listTasks,
  getTaskById,
  getTaskLogs,
} = require("./task.service");

const create = asyncHandler(async (req, res) => {
  const task = await createTask(req.user._id, req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
});

const list = asyncHandler(async (req, res) => {
  const result = await listTasks(req.user._id, req.query);

  res.status(200).json({
    success: true,
    ...result,
  });
});

const details = asyncHandler(async (req, res) => {
  const task = await getTaskById(req.user._id, req.params.id);

  res.status(200).json({
    success: true,
    data: task,
  });
});

const logs = asyncHandler(async (req, res) => {
  const taskLogs = await getTaskLogs(req.user._id, req.params.id);

  res.status(200).json({
    success: true,
    data: taskLogs,
  });
});

module.exports = {
  create,
  list,
  details,
  logs,
};