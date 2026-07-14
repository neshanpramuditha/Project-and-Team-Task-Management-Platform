import api from "./api";

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data.data;
};

export const createTask = async (data) => {
  const response = await api.post("/tasks", data);
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data.data;
};

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data.data;
};
export const updateTaskStatus = async (id, status) => {
  const response = await api.patch(
    `/tasks/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};