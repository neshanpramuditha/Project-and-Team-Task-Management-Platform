import * as notificationService from "../services/notification.service.js";

// Get all notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getAllNotifications();

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get notifications by user
export const getUserNotifications = async (req, res) => {
  try {
    const notifications =
      await notificationService.getNotificationsByUser(
        req.params.userId
      );

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Create notification
export const createNotification = async (req, res) => {
  try {
    const notification =
      await notificationService.createNotification(req.body);

    res.status(201).json({
      success: true,
      message: "Notification created successfully.",
      data: notification,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification =
      await notificationService.markAsRead(req.params.id);

    res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      data: notification,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark all as read
export const markAllAsRead = async (req, res) => {
  try {
    const result =
      await notificationService.markAllAsRead(
        req.params.userId
      );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  try {
    const result =
      await notificationService.deleteNotification(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};