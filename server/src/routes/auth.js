const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const verifyToken = require("../middleware/authMiddleware");


//User Routes
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);
router.post("/user/verify", authController.verifyUser);
router.get("/user/me", verifyToken, authController.getCurrentUser);


module.exports = router;