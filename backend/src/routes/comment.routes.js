import express from "express";

import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| All comment routes require authentication
|--------------------------------------------------------------------------
*/
router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Get all comments for a task
| GET /api/tasks/:taskId/comments
|--------------------------------------------------------------------------
*/
router.get(
  "/tasks/:taskId/comments",
  getComments
);

/*
|--------------------------------------------------------------------------
| Create a comment for a task
| POST /api/tasks/:taskId/comments
|--------------------------------------------------------------------------
*/
router.post(
  "/tasks/:taskId/comments",
  createComment
);

/*
|--------------------------------------------------------------------------
| Delete a comment
| DELETE /api/comments/:id
|--------------------------------------------------------------------------
*/
router.delete(
  "/comments/:id",
  deleteComment
);

export default router;