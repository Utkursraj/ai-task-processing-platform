const router = require("express").Router();
const authMiddleware = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validate.middleware");
const { createTaskSchema } = require("./task.validation");
const {
  create,
  list,
  details,
  logs,
} = require("./task.controller");

router.use(authMiddleware);

router.post("/", validate(createTaskSchema), create);
router.get("/", list);
router.get("/:id", details);
router.get("/:id/logs", logs);

module.exports = router;