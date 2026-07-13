import { PrismaClient, ProjectStatus, TaskStatus, Priority } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...🌱");

  // Roles
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      name: "ADMIN",
      description: "System Administrator",
    },
  });

  const managerRole = await prisma.role.upsert({
    where: { name: "PROJECT_MANAGER" },
    update: {},
    create: {
      name: "PROJECT_MANAGER",
      description: "Project Manager",
    },
  });

  const memberRole = await prisma.role.upsert({
    where: { name: "TEAM_MEMBER" },
    update: {},
    create: {
      name: "TEAM_MEMBER",
      description: "Team Member",
    },
  });

  const password = await bcrypt.hash("Password@123", 10);

  // Users
  const admin = await prisma.user.upsert({
    where: { email: "admin@taskflow.com" },
    update: {},
    create: {
      firstName: "System",
      lastName: "Administrator",
      email: "admin@taskflow.com",
      password,
      roleId: adminRole.id,
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: "manager@taskflow.com" },
    update: {},
    create: {
      firstName: "John",
      lastName: "Manager",
      email: "manager@taskflow.com",
      password,
      roleId: managerRole.id,
    },
  });

  const member = await prisma.user.upsert({
    where: { email: "member@taskflow.com" },
    update: {},
    create: {
      firstName: "Jane",
      lastName: "Member",
      email: "member@taskflow.com",
      password,
      roleId: memberRole.id,
    },
  });

  // Project
  const project = await prisma.project.upsert({
    where: {
      code: "PRJ-001",
    },
    update: {},
    create: {
      code: "PRJ-001",
      title: "Project and Team Task Management Platform",
      description: "Internship Practical Assignment",
      status: ProjectStatus.ACTIVE,
      progress: 25,
      managerId: manager.id,
    },
  });

  // Project Member
  await prisma.projectMember.upsert({
    where: {
      projectId_userId: {
        projectId: project.id,
        userId: member.id,
      },
    },
    update: {},
    create: {
      projectId: project.id,
      userId: member.id,
    },
  });

  // Tasks
  await prisma.task.createMany({
    data: [
      {
        title: "Design Login Page",
        description: "Create responsive login page",
        status: TaskStatus.TODO,
        priority: Priority.HIGH,
        projectId: project.id,
        assignedTo: member.id,
      },
      {
        title: "Develop Authentication API",
        description: "Implement JWT authentication",
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.URGENT,
        projectId: project.id,
        assignedTo: manager.id,
      },
      {
        title: "Build Dashboard",
        description: "Create project dashboard UI",
        status: TaskStatus.TODO,
        priority: Priority.MEDIUM,
        projectId: project.id,
        assignedTo: member.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Database seeded successfully! ✅");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });