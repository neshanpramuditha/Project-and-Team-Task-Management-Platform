import prisma from "../config/prisma.js";

export const getDashboard = async () => {

  const [
    totalUsers,
    totalProjects,
    totalTasks,
    totalNotifications,
    unreadNotifications,
    totalActivities,

    activeProjects,
    completedProjects,

    todoTasks,
    inProgressTasks,
    completedTasks,

    recentActivities

  ] = await Promise.all([

    prisma.user.count(),

    prisma.project.count(),

    prisma.task.count(),

    prisma.notification.count(),

    prisma.notification.count({
      where: {
        isRead: false
      }
    }),

    prisma.activityLog.count(),

    prisma.project.count({
      where: {
        status: "ACTIVE"
      }
    }),

    prisma.project.count({
      where: {
        status: "COMPLETED"
      }
    }),

    prisma.task.count({
      where: {
        status: "TODO"
      }
    }),

    prisma.task.count({
      where: {
        status: "IN_PROGRESS"
      }
    }),

    prisma.task.count({
      where: {
        status: "DONE"
      }
    }),

    prisma.activityLog.findMany({

      include: {

        user: {
          select: {
            firstName: true,
            lastName: true
          }
        }

      },

      orderBy: {
        createdAt: "desc"
      },

      take: 10

    })

  ]);

  return {

    users: {
      total: totalUsers
    },

    projects: {
      total: totalProjects,
      active: activeProjects,
      completed: completedProjects
    },

    tasks: {
      total: totalTasks,
      todo: todoTasks,
      inProgress: inProgressTasks,
      completed: completedTasks
    },

    notifications: {
      total: totalNotifications,
      unread: unreadNotifications
    },

    activities: {
      total: totalActivities,
      recent: recentActivities
    }

  };

};