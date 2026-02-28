import express from "express";
import { authMiddleware } from "../middlewares/jwt.js";
import {
  downvoteAnswer,
  downvoteQuestion,
  upvoteAnswer,
  upvoteQuestion,
} from "../controllers/vote.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/:questionId/upvote", authMiddleware, upvoteQuestion);
router.post("/downvote", authMiddleware, downvoteQuestion);
router.post("/upvote", authMiddleware, upvoteAnswer);
router.post("/downvote", authMiddleware, downvoteAnswer);

export { router as voteRouter };
