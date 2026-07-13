import * as taskService from "../services/task.service.js";

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get task by ID
export const getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Create task
export const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update task status
export const updateStatus = async (req, res) => {
  try {
    const task = await taskService.updateTaskStatus(
      req.params.id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Task status updated.",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id);

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

// Get tasks by project
export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByProject(req.params.projectId);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};