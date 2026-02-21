import express from "express";
import {
  changePassword,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/jwt.js";

const router = express.Router();
const userRouter = router;

router.get("/profile", authMiddleware, getUserProfile);
router.patch("/profile", authMiddleware, updateUserProfile);
router.put("/password", authMiddleware, changePassword);
router.delete("/", authMiddleware, deleteUser);

export {userRouter};
