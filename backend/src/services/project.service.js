import prisma from "../config/prisma.js";

/**
 * Get all projects
 */
export const getAllProjects = async () => {
  return await prisma.project.findMany({
    include: {
      manager: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },

      members: {
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
      },

      tasks: {
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          dueDate: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Get project by ID
 */
export const getProjectById = async (id) => {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      manager: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },

      members: {
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
      },

      tasks: {
        include: {
          assignee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

/**
 * Create project
 */
export const createProject = async (data) => {
  const existingProject = await prisma.project.findUnique({
    where: {
      code: data.code,
    },
  });

  if (existingProject) {
    throw new Error("Project code already exists");
  }

  return await prisma.project.create({
    data: {
      code: data.code,
      title: data.title,
      description: data.description,
      managerId: Number(data.managerId),

      startDate: data.startDate
        ? new Date(data.startDate)
        : null,

      endDate: data.endDate
        ? new Date(data.endDate)
        : null,
    },

    include: {
      manager: true,
    },
  });
};

/**
 * Update project
 */
export const updateProject = async (id, data) => {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return await prisma.project.update({
    where: {
      id: Number(id),
    },

    data: {
      ...data,

      managerId: data.managerId
        ? Number(data.managerId)
        : undefined,

      startDate: data.startDate
        ? new Date(data.startDate)
        : undefined,

      endDate: data.endDate
        ? new Date(data.endDate)
        : undefined,
    },

    include: {
      manager: true,
    },
  });
};

/**
 * Delete project
 */
export const deleteProject = async (id) => {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  await prisma.project.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Project deleted successfully",
  };
};

/**
 * Assign member to project
 */
export const addMember = async (projectId, userId) => {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(projectId),
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existingMember = await prisma.projectMember.findFirst({
    where: {
      projectId: Number(projectId),
      userId: Number(userId),
    },
  });

  if (existingMember) {
    throw new Error("User is already assigned to this project");
  }

  return await prisma.projectMember.create({
    data: {
      projectId: Number(projectId),
      userId: Number(userId),
    },

    include: {
      user: true,
    },
  });
};

/**
 * Remove member from project
 */
export const removeMember = async (projectId, userId) => {
  const member = await prisma.projectMember.findFirst({
    where: {
      projectId: Number(projectId),
      userId: Number(userId),
    },
  });

  if (!member) {
    throw new Error("Project member not found");
  }

  await prisma.projectMember.delete({
    where: {
      id: member.id,
    },
  });

  return {
    message: "Member removed successfully",
  };
};