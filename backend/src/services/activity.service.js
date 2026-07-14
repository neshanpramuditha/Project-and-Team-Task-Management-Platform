import prisma from "../config/prisma.js";

/**
 * Get all activity logs
 */
export const getAllActivities = async () => {
  return await prisma.activityLog.findMany({
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
 * Get activities by user
 */
export const getActivitiesByUser = async (userId) => {
  return await prisma.activityLog.findMany({
    where: {
      userId: Number(userId),
    },

    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Create activity log
 */
export const createActivity = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(data.userId),
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.activityLog.create({
    data: {
      action: data.action,
      entity: data.entity,
      entityId: data.entityId
        ? Number(data.entityId)
        : null,
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
 * Delete activity
 */
export const deleteActivity = async (id) => {
  const activity = await prisma.activityLog.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!activity) {
    throw new Error("Activity not found");
  }

  await prisma.activityLog.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Activity deleted successfully.",
  };
};