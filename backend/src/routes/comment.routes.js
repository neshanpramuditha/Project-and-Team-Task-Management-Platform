import express from "express";

import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// Get comments of a task
router.get(
  "/tasks/:taskId/comments",
  getComments
);

// Add comment to a task
router.post(
  "/tasks/:taskId/comments",
  createComment
);

// Delete comment
router.delete(
  "/comments/:id",
  deleteComment
);

export default router;