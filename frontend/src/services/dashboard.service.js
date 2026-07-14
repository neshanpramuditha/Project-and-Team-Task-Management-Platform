import api from "./api";

export const getDashboardStats = async () => {

  const [dashboard, tasks] = await Promise.all([
    api.get("/dashboard"),
    api.get("/tasks"),
  ]);

  return {
    stats: dashboard.data.data,
    tasks: tasks.data.data,
  };

};