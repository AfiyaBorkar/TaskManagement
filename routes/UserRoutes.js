const express = require("express");
const router = express.Router();

const {
  loginController,
  registerController,
  fetchAllUsersController,
} = require("../controller/UserControllers");
// const {dashboardController} = require("../controller/AdminControllers");
const protect = require("../middleware/AuthMiddleware");

router.post("/login", loginController);
// router.get('/admin',dashboardController)
router.post("/register", registerController);
router.get("/fetchUsers", protect, fetchAllUsersController);

module.exports = router;
