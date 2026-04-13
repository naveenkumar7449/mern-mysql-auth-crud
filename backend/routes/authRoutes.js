const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
 register,
 login,
 getMe,
 forgotPassword,
 resetPassword
} = require("../controllers/authController");


// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// GET LOGGED USER
router.get("/me", authMiddleware, getMe);

// FORGOT PASSWORD
router.post("/forgot-password", forgotPassword);

// RESET PASSWORD
router.post("/reset-password/:token", resetPassword);


module.exports = router;