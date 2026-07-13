import * as projectService from "../services/project.service.js";

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get project by ID
export const getProject = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Create project
export const createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const project = await projectService.updateProject(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const result = await projectService.deleteProject(req.params.id);

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

// Assign member
export const addMember = async (req, res) => {
  try {
    const member = await projectService.addMember(
      req.params.id,
      req.body.userId
    );

    res.status(201).json({
      success: true,
      message: "Member assigned successfully.",
      data: member,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove member
export const removeMember = async (req, res) => {
  try {
    const result = await projectService.removeMember(
      req.params.id,
      req.params.userId
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