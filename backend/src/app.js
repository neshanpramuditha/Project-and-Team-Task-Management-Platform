console.log("🚀 app.js loaded");

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
import prisma from "./config/prisma.js";
import commentRoutes from "./routes/comment.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Project Management API Running 🚀",
  });
});

// TEMP DEBUG ROUTE
app.get("/test-project", async (req, res) => {
  console.log("✅ /test-project route hit");

  try {
    const project = await prisma.project.findFirst({
      select: {
        id: true,
        code: true,
        title: true,
        progress: true,
      },
    });

    console.log(project);

    res.json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", commentRoutes);
app.use("/api", notificationRoutes);
export default app;