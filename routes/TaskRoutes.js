const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  completedTask
} = require("../controller/TaskControllers");
const protect = require("../middleware/AuthMiddleware");

router.get("/:userId", protect, getAllTasks);
router.post("/:userId", protect, createTask);
router.put("/:userId/:id", protect, updateTask);
router.delete("/:userId/:id", protect, deleteTask);
router.post("/completed/:userId/:id", protect, completedTask);


module.exports = router;
