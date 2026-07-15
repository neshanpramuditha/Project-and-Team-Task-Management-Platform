import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

import { useAuth } from "../hooks/useAuth";

import KanbanBoard from "../components/task/KanbanBoard";
import TaskModal from "../components/task/TaskModal";
import DeleteTaskModal from "../components/task/DeleteTaskModal";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../services/task.service";
import LoadingSpinner from "../components/common/LoadingSpinner";

function Tasks() {
  const { user } = useAuth();

  const role = user?.role?.name ?? "";

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTaskItem, setDeleteTaskItem] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(task) {
    setSelectedTask(task);
    setShowModal(true);
  }

  function handleDelete(task) {
    setDeleteTaskItem(task);
    setDeleteModal(true);
  }

  async function handleSave(data) {
    try {
      const taskData = {
        ...data,
        dueDate: data.dueDate || null,
      };

      if (selectedTask) {
        await updateTask(selectedTask.id, taskData);
        toast.success("Task updated successfully");
      } else {
        await createTask(taskData);
        toast.success("Task created successfully");
      }

      setShowModal(false);
      setSelectedTask(null);

      await loadTasks();
    } catch (error) {
      console.error(error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Failed to save task"
      );
    }
  }

  async function confirmDelete() {
    try {
      await deleteTask(deleteTaskItem.id);

      toast.success("Task deleted successfully");

      setDeleteModal(false);
      setDeleteTaskItem(null);

      await loadTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  }

  async function handleTaskMove(taskId, status) {
    const previousTasks = [...tasks];

    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, status }
          : task
      )
    );

    try {
      await updateTaskStatus(taskId, status);

      toast.success("Task moved successfully");
    } catch (error) {
      console.error(error);

      setTasks(previousTasks);

      toast.error(
        error.response?.data?.message ||
          "Failed to move task"
      );
    }
  }

  if (loading) {
    return (
      <div className="mt-20 text-center text-lg font-semibold">
        <LoadingSpinner text="Loading..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
          Task Board
          </h1>

          <p className="mt-2 text-gray-500">
          Manage your team's work efficiently.
          </p>

        </div>

        {role !== "TEAM_MEMBER" && (
          <button
            onClick={() => {
              setSelectedTask(null);
              setShowModal(true);
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#FF6B4A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#F0562F] focus:outline-none focus:ring-4 focus:ring-[#FF6B4A]/25"
          >
            <FaPlus />
            New Task
          </button>
        )}

      </div>

      <KanbanBoard
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTaskMove={handleTaskMove}
      />

      <TaskModal
        isOpen={showModal}
        initialData={selectedTask}
        onClose={() => {
          setShowModal(false);
          setSelectedTask(null);
        }}
        onSubmit={handleSave}
      />

      <DeleteTaskModal
        isOpen={deleteModal}
        task={deleteTaskItem}
        onCancel={() => {
          setDeleteModal(false);
          setDeleteTaskItem(null);
        }}
        onConfirm={confirmDelete}
      />

    </div>
  );
}

export default Tasks;