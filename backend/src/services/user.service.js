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
  // Email already exists?
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Find role
  const role = await prisma.role.findUnique({
    where: {
      name: data.role,
    },
  });

  if (!role) {
    throw new Error("Invalid role");
  }

  // Password required
  if (!data.password || data.password.trim() === "") {
    throw new Error("Password is required");
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

  // Convert role name -> roleId
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

  // Update password ONLY if user entered one
  if (data.password && data.password.trim() !== "") {
    data.password = await bcrypt.hash(data.password, 10);
  } else {
    delete data.password;
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      roleId: data.roleId,
      ...(data.password && { password: data.password }),
    },
    include: {
      role: true,
    },
  });

  const { password, ...userWithoutPassword } = updatedUser;

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