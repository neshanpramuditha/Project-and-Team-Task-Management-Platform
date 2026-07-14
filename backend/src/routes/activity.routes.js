import express from "express";

import {
  getActivities,
  getUserActivities,
  createActivity,
  deleteActivity,
} from "../controllers/activity.controller.js";

const router = express.Router();

// Get all activities
router.get("/activities", getActivities);

// Get activities by user
router.get(
  "/activities/user/:userId",
  getUserActivities
);

// Create activity
router.post(
  "/activities",
  createActivity
);

// Delete activity
router.delete(
  "/activities/:id",
  deleteActivity
);

export default router;