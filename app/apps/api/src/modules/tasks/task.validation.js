const { z } = require("zod");

const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(120),
    inputText: z.string().min(1).max(5000),
    operation: z.enum(["uppercase", "lowercase", "reverse", "word_count"]),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

module.exports = {
  createTaskSchema,
};