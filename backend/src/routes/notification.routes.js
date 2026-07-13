import express from "express";

import {
  getNotifications,
  getUserNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

// Get all notifications
router.get("/notifications", getNotifications);

// Get notifications by user
router.get(
  "/notifications/user/:userId",
  getUserNotifications
);

// Create notification
router.post(
  "/notifications",
  createNotification
);

// Mark one notification as read
router.patch(
  "/notifications/:id/read",
  markAsRead
);

// Mark all notifications as read
router.patch(
  "/notifications/user/:userId/read-all",
  markAllAsRead
);

// Delete notification
router.delete(
  "/notifications/:id",
  deleteNotification
);

export default router;