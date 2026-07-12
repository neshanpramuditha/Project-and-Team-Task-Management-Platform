import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      roleId: user.roleId,
      email: user.email,
    },
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};