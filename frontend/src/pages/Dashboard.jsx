import { useEffect, useState } from "react";

import {
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

import StatCard from "../components/dashboard/StatCard";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import ProgressChart from "../components/dashboard/ProgressChart";
import TaskStatusChart from "../components/dashboard/TaskStatusChart";
import { getDashboardStats } from "../services/dashboard.service";
import LoadingSkeleton from "../components/dashboard/LoadingSkeleton";
import RecentTasks from "../components/dashboard/RecentTasks";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardStats();
      setStats(data.stats);
      setTasks(data.tasks);

    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <DashboardHeader />

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Projects"
          value={stats.projects.total}
          icon={FaProjectDiagram}
          color="bg-blue-600"
          subtitle={`${stats.projects.active} Active`}
        />

        <StatCard
          title="Tasks"
          value={stats.tasks.total}
          icon={FaTasks}
          color="bg-green-600"
          subtitle={`${stats.tasks.todo} Todo`}
        />

        <StatCard
          title="Users"
          value={stats.users.total}
          icon={FaUsers}
          color="bg-purple-600"
          subtitle="Registered Users"
        />

        <StatCard
          title="Completed"
          value={stats.tasks.completed}
          icon={FaCheckCircle}
          color="bg-orange-500"
          subtitle="Completed Tasks"
        />

      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">

        <ProgressChart stats={stats} />

        <TaskStatusChart stats={stats} />

      </div>
      <div className="mt-8">
        <RecentTasks tasks={tasks} />
      </div>

    </div>
  );
}

export default Dashboard;