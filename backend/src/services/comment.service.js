import prisma from "../config/prisma.js";

/**
 * Get all comments for a task
 */
export const getCommentsByTask = async (taskId) => {
  return await prisma.taskComment.findMany({
    where: {
      taskId: Number(taskId),
    },

    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "asc",
    },
  });
};

/**
 * Create a new comment
 */
export const createComment = async (taskId, data) => {
  // Check task exists
  const task = await prisma.task.findUnique({
    where: {
      id: Number(taskId),
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  // Check user exists
  const user = await prisma.user.findUnique({
    where: {
      id: Number(data.userId),
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.taskComment.create({
    data: {
      message: data.message,
      taskId: Number(taskId),
      userId: Number(data.userId),
    },

    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
};

/**
 * Delete comment
 */
export const deleteComment = async (id) => {
  const comment = await prisma.taskComment.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  await prisma.taskComment.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Comment deleted successfully.",
  };
};