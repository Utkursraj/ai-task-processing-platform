const mongoose = require("mongoose");

const taskLogSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
      index: true,
    },
    level: {
      type: String,
      enum: ["info", "warn", "error"],
      default: "info",
    },
    message: {
      type: String,
      required: true,
    },
    meta: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

taskLogSchema.index({ taskId: 1, createdAt: 1 });

module.exports = mongoose.model("TaskLog", taskLogSchema);