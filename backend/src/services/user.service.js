import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

// Get all users
export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return users.map(({ password, ...user }) => user);
};

// Get user by ID
export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Create new user
export const createUser = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const role = await prisma.role.findUnique({
    where: {
      name: data.role,
    },
  });

  if (!role) {
    throw new Error("Invalid role");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      roleId: role.id,
    },
    include: {
      role: true,
    },
  });

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

// Update user
export const updateUser = async (id, data) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  // Hash password only if provided
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  if (data.role) {
  const role = await prisma.role.findUnique({
    where: {
      name: data.role,
    },
  });

  if (!role) {
    throw new Error("Invalid role");
  }

  data.roleId = role.id;
  delete data.role;
}

  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data,
    include: {
      role: true,
    },
  });

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Delete user
export const deleteUser = async (id) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "User deleted successfully",
  };
};