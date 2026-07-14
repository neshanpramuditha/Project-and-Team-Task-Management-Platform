import api from "./api";

export const getComments = async (taskId) => {
  const response = await api.get(
    `/tasks/${taskId}/comments`
  );

  return response.data.data;
};

export const createComment = async (
  taskId,
  data
) => {
  const response = await api.post(
    `/tasks/${taskId}/comments`,
    data
  );

  return response.data.data;
};

export const deleteComment = async (id) => {
  const response = await api.delete(
    `/comments/${id}`
  );

  return response.data;
};