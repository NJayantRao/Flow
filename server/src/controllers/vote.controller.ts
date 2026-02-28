import { prisma } from "../lib/prisma.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import AsyncHandler from "../utils/async-handler.js";
import { reputationActions } from "../utils/constants.js";

/**
 * -@route POST /questions/:questionId/upvote
 * -@desc upvote question controller
 * -@access private
 */
/**
 * 1. check question exists in db
 * 2. create transaction
 * 3. increment vote by 1
 * 4. add record in vote db
 * 5. update reputation points in user db by +5
 * 6. create 2 ledgers for both votedto and votedby
 * 7. end transaction
 */
export const upvoteQuestion = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;
  const { questionId } = req.params;

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });
  if (!question) {
    return res.status(404).json(new ApiError(404, "Question not found"));
  }
  //AVOID SELF VOTE
  if (userId === question.authorId) {
    return res
      .status(400)
      .json(new ApiError(400, "You cannot upvote your own question"));
  }
  console.log();

  const result = await prisma.$transaction(async (tx: any) => {
    const vote = await tx.vote.create({
      data: { votedById: userId, questionId, voteStatus: "UPVOTED" },
    });

    //update in user
    const updatedUser = await tx.user.update({
      where: { id: question.authorId },
      data: { reputation: { increment: reputationActions.QUESTION_UPVOTED } },
    });

    const updatedQuestion = await tx.question.update({
      where: { id: questionId },
      data: { voteCount: { increment: 1 } },
    });

    //reputation ledger
    const reputationLedger = await tx.reputationLedger.create({
      data: {
        userId: question.authorId,
        action: "QUESTION_UPVOTED",
        points: reputationActions.QUESTION_UPVOTED,
        questionId,
      },
    });

    return { vote, reputationLedger };
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Question upvoted successfully", result));
});

export const downvoteQuestion = AsyncHandler(async (req: any, res: any) => {});

export const upvoteAnswer = AsyncHandler(async (req: any, res: any) => {});

export const downvoteAnswer = AsyncHandler(async (req: any, res: any) => {});
