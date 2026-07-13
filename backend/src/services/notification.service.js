import prisma from "../config/prisma.js";

/**
 * Get all notifications
 */
export const getAllNotifications = async () => {
  return await prisma.notification.findMany({
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
      createdAt: "desc",
    },
  });
};

/**
 * Get notifications by user
 */
export const getNotificationsByUser = async (userId) => {
  return await prisma.notification.findMany({
    where: {
      userId: Number(userId),
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Create notification
 */
export const createNotification = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(data.userId),
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.notification.create({
    data: {
      title: data.title,
      message: data.message,
      userId: Number(data.userId),
    },
  });
};

/**
 * Mark notification as read
 */
export const markAsRead = async (id) => {
  const notification = await prisma.notification.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  return await prisma.notification.update({
    where: {
      id: Number(id),
    },

    data: {
      isRead: true,
    },
  });
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = async (userId) => {
  await prisma.notification.updateMany({
    where: {
      userId: Number(userId),
      isRead: false,
    },

    data: {
      isRead: true,
    },
  });

  return {
    message: "All notifications marked as read.",
  };
};

/**
 * Delete notification
 */
export const deleteNotification = async (id) => {
  const notification = await prisma.notification.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  await prisma.notification.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Notification deleted successfully.",
  };
};