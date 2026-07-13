import * as commentService from "../services/comment.service.js";

// Get comments by task
export const getComments = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByTask(
      req.params.taskId
    );

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create comment
export const createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment(
      req.params.taskId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Comment added successfully.",
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const result = await commentService.deleteComment(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};