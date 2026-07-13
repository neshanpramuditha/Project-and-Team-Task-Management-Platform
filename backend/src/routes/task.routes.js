import express from "express";

import * as taskController from "../controllers/task.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
} from "../validations/task.validation.js";

const router = express.Router();

// All task routes require login
router.use(authenticate);

// Everyone logged in can view tasks
router.get("/", taskController.getTasks);

router.get("/project/:projectId", taskController.getTasksByProject);

router.get("/:id", taskController.getTask);



// Admin & Project Manager can create/update
router.post(
  "/",
  authorize("ADMIN", "PROJECT_MANAGER"),
  validate(createTaskSchema),
  taskController.createTask
);

router.put(
  "/:id",
  authorize("ADMIN", "PROJECT_MANAGER"),
  validate(updateTaskSchema),
  taskController.updateTask
);

// Team members can update status too
router.patch(
  "/:id/status",
  authorize("ADMIN", "PROJECT_MANAGER", "TEAM_MEMBER"),
  validate(updateTaskStatusSchema),
  taskController.updateStatus
);

// Only Admin can delete
router.delete(
  "/:id",
  authorize("ADMIN"),
  taskController.deleteTask
);

export default router;