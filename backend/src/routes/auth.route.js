const express = require("express")
const authController = require("../controllers/auth.controller")
const userController = require("../controllers/user.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router()

router.post("/auth/register", authController.registerUser)
router.post("/auth/login", authController.loginUser)
router.post("/auth/logout", authController.logoutUser)
router.get("/auth/user/me", authMiddleware, userController.getUser)

module.exports = router