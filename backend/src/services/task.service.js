console.log("✅ task.service.js loaded");
import prisma from "../config/prisma.js";


/** Get all tasks */
export const getAllTasks = async () => {

  return await prisma.task.findMany({

    include: {

      project: {
        select: {
          id: true,
          title: true,
          code: true
        }
      },

      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }

    },

    orderBy: {
      createdAt: "desc"
    }

  });

};


/**
 * Get task by ID
 */
export const getTaskById = async (id) => {

  const task = await prisma.task.findUnique({

    where: {
      id: Number(id)
    },

    include: {

      project: true,

      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      },

      comments: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true
            }
          }
        }
      }

    }

  });

  if (!task) {
    throw new Error("Task not found");
  }

  return task;

};


/**
 * Create task
 */
export const createTask = async (data) => {

  const project = await prisma.project.findUnique({
    where: {
      id: Number(data.projectId)
    }
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(data.assignedTo)
    }
  });

  if (!user) {
    throw new Error("Assigned user not found");
  }

  return await prisma.task.create({

    data: {

      title: data.title,

      description: data.description,

      priority: data.priority,

      dueDate: data.dueDate
        ? new Date(data.dueDate)
        : null,

      projectId: Number(data.projectId),

      assignedTo: Number(data.assignedTo)

    },

    include: {

      project: true,

      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }

    }

  });

};


/**
 * Update task
 */
export const updateTask = async (id, data) => {

  const existingTask = await prisma.task.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  return await prisma.task.update({

    where: {
      id: Number(id)
    },

    data: {

      ...data,

      projectId: data.projectId
        ? Number(data.projectId)
        : undefined,

      assignedTo: data.assignedTo
        ? Number(data.assignedTo)
        : undefined,

      dueDate: data.dueDate
        ? new Date(data.dueDate)
        : undefined

    },

    include: {

      project: true,

      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }

    }

  });

};


/**
 * Update task status
 */
export const updateTaskStatus = async (
  id,
  status
) => {

  return await prisma.task.update({

    where: {
      id: Number(id)
    },

    data: {
      status
    }

  });

};


/**
 * Delete task
 */
export const deleteTask = async (id) => {

  const existingTask = await prisma.task.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  await prisma.task.delete({

    where: {
      id: Number(id)
    }

  });

  return {
    message: "Task deleted successfully"
  };

};


/**
 * Get tasks for a specific project
 */
export const getTasksByProject = async (
  projectId
) => {

  return await prisma.task.findMany({

    where: {
      projectId: Number(projectId)
    },

    include: {

      assignee: {
        select: {
          id: true,
          firstName: true,
          lastName: true
        }
      }

    }

  });

};