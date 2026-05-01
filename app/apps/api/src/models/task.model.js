const mongoose = require("mongoose");
const TASK_STATUS = require("../constants/task-status");
const TASK_OPERATIONS = require("../constants/task-operations");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    inputText: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    operation: {
      type: String,
      required: true,
      enum: Object.values(TASK_OPERATIONS),
    },
    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.PENDING,
      index: true,
    },
    result: {
      type: String,
      default: null,
    },
    error: {
      type: String,
      default: null,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    idempotencyKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

taskSchema.index({ userId: 1, status: 1, createdAt: -1 });
taskSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Task", taskSchema);