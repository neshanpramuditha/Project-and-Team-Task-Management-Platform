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
    <div className="syncro-dashboard space-y-8 bg-[#F6F7FB] px-1 pb-4">

      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

          .syncro-dashboard {
              font-family: 'Inter', sans-serif;
          }
          .syncro-dashboard h1,
          .syncro-dashboard h2,
          .syncro-dashboard h3 {
              font-family: 'Space Grotesk', sans-serif;
          }
      `}</style>

      {/* Header */}
      <DashboardHeader />

      {/* Statistics Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Projects"
          value={stats.projects.total}
          icon={FaProjectDiagram}
          color="bg-[#10131F]"
          subtitle={`${stats.projects.active} Active`}
        />

        <StatCard
          title="Tasks"
          value={stats.tasks.total}
          icon={FaTasks}
          color="bg-[#FF6B4A]"
          subtitle={`${stats.tasks.todo} Todo`}
        />

        <StatCard
          title="Users"
          value={stats.users.total}
          icon={FaUsers}
          color="bg-[#3A4064]"
          subtitle="Registered Users"
        />

        <StatCard
          title="Completed"
          value={stats.tasks.completed}
          icon={FaCheckCircle}
          color="bg-[#1F9D6B]"
          subtitle="Completed Tasks"
        />

      </div>

      {/* Charts */}
      <div className="grid gap-5 lg:grid-cols-2">

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
          <ProgressChart stats={stats} />
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
          <TaskStatusChart stats={stats} />
        </div>

      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <RecentTasks tasks={tasks} />
      </div>

    </div>
  );
}

export default Dashboard;