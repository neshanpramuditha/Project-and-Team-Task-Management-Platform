import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import TaskBoard from "../components/task/TaskBoard";
import toast from "react-hot-toast";
import TaskModal from "../components/task/TaskModal";
import { getTasks, createTask, updateTask, deleteTask, } from "../services/task.service";
import DeleteTaskModal from "../components/task/DeleteTaskModal";

function Tasks() {

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

    } finally {
      setLoading(false);

    }

  }
  function handleEdit(task) {
  setSelectedTask(task);
  setShowModal(true);

}

  function handleDelete(task){
    setDeleteTaskItem(task);
    setDeleteModal(true);
}

  if (loading) {

    return (

      <div className="text-center mt-20">

        Loading Tasks...

      </div>

    );

  }
  async function handleSave(data) {

  try {

    const taskData = {

      ...data,

      dueDate: data.dueDate || null,

    };

    if (selectedTask) {

      await updateTask(
        selectedTask.id,
        taskData
      );

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
async function confirmDelete(){

    try{

        await deleteTask(deleteTaskItem.id);

        toast.success("Task deleted successfully");
        setDeleteModal(false);
        setDeleteTaskItem(null);
        loadTasks();

    }catch(error){

        toast.error(
            error.response?.data?.message ||
            "Delete failed"
        );

    }

}

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">

            Task Board

          </h1>

          <p className="mt-2 text-gray-500">

            Manage your team's work

          </p>

        </div>

        <button
        onClick={() => {
        setSelectedTask(null);
        setShowModal(true);
      }}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">

          <FaPlus />

          New Task

        </button>

      </div>

      <TaskBoard

        tasks={tasks}

        onEdit={handleEdit}

        onDelete={handleDelete}

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