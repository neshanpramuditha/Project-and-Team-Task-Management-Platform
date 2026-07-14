import * as activityService from "../services/activity.service.js";

// Get all activities
export const getActivities = async (req, res) => {
  try {
    const activities = await activityService.getAllActivities();

    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get activities by user
export const getUserActivities = async (req, res) => {
  try {
    const activities = await activityService.getActivitiesByUser(
      req.params.userId
    );

    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Create activity
export const createActivity = async (req, res) => {
  try {
    const activity = await activityService.createActivity(req.body);

    res.status(201).json({
      success: true,
      message: "Activity created successfully.",
      data: activity,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete activity
export const deleteActivity = async (req, res) => {
  try {
    const result = await activityService.deleteActivity(
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