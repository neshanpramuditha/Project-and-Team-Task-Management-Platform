import prisma from "../config/prisma.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

export const login = async (email, password) => {

  const user = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      role: true
    }
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const validPassword = await comparePassword(
    password,
    user.password
  );

  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);

  delete user.password;

  return {
    token,
    user
  };

};