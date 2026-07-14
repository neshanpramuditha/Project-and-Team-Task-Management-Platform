import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { getTasks } from "../services/task.service";
import TaskBoard from "../components/task/TaskBoard";

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
    console.log(task);

  }

  function handleDelete(task) {

    console.log(task);

  }

  if (loading) {

    return (

      <div className="text-center mt-20">

        Loading Tasks...

      </div>

    );

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

        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">

          <FaPlus />

          New Task

        </button>

      </div>

      <TaskBoard

        tasks={tasks}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

    </div>

  );

}

export default Tasks;