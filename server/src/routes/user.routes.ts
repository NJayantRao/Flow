import express from "express";
import {
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/jwt.js";
import {usernameUpdateValidation} from "../middlewares/validator.js";

const router = express.Router();
const userRouter = router;

router.get("/profile", authMiddleware, getUserProfile);
router.patch(
  "/profile",
  authMiddleware,
  usernameUpdateValidation,
  updateUserProfile
);
router.delete("/", authMiddleware, deleteUser);

export {userRouter};
