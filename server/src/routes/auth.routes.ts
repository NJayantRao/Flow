import express from "express";
import {authMiddleware} from "../middlewares/jwt.js";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import {userRegistrationValidation} from "../middlewares/validator.js";

const router = express.Router();
const authRouter = router;

router.post("/register", userRegistrationValidation, registerUser);
router.post("/login", loginUser);
router.get("/verify-email", verifyEmail);
router.post("/refresh-token", refreshAccessToken);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", authMiddleware, logoutUser);

export {authRouter};
