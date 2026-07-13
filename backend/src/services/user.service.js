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
  // Check duplicate email
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      roleId: Number(data.roleId),
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

  if (data.roleId) {
    data.roleId = Number(data.roleId);
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