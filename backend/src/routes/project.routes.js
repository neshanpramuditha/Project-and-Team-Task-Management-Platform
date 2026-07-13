import express from "express";

import * as projectController from "../controllers/project.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../validations/project.validation.js";

const router = express.Router();

// Every project route requires login
router.use(authenticate);

// Everyone logged in can view projects
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProject);

// Admin & Project Manager can create/update
router.post(
  "/",
  authorize("ADMIN", "PROJECT_MANAGER"),
  validate(createProjectSchema),
  projectController.createProject
);

router.put(
  "/:id",
  authorize("ADMIN", "PROJECT_MANAGER"),
  validate(updateProjectSchema),
  projectController.updateProject
);

// Only Admin can delete
router.delete(
  "/:id",
  authorize("ADMIN"),
  projectController.deleteProject
);

// Assign members
router.post(
  "/:id/members",
  authorize("ADMIN", "PROJECT_MANAGER"),
  projectController.addMember
);

// Remove members
router.delete(
  "/:id/members/:userId",
  authorize("ADMIN", "PROJECT_MANAGER"),
  projectController.removeMember
);

export default router;