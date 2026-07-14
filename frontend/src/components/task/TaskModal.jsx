import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getProjects, getUsers } from "../../services/task.service";
import CommentSection from "../comment/CommentSection";

function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    loadData();

    if (initialData) {
    reset({

        ...initialData,

        projectId: initialData.projectId,

        assignedTo: initialData.assignedTo,

        dueDate: initialData.dueDate
            ? initialData.dueDate.substring(0,10)
            : ""
    });
    } else {
      reset({
        title: "",
        description: "",
        priority: "MEDIUM",
        status: "TODO",
        projectId: "",
        assignedTo: "",
        dueDate: "",
      });
    }
  }, [isOpen, initialData, reset]);

  async function loadData() {
    try {
      const [projectData, userData] = await Promise.all([
        getProjects(),
        getUsers(),
      ]);

      setProjects(projectData);
      setUsers(userData);
    } catch (error) {
      console.error(error);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">

          {initialData ? "Edit Task" : "Create Task"}

        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>

            <label className="font-medium">
              Title
            </label>

            <input
              {...register("title", {
                required: true,
              })}
              className="mt-2 w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="font-medium">
              Description
            </label>

            <textarea
              {...register("description")}
              rows={4}
              className="mt-2 w-full rounded-lg border p-3"
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label>Priority</label>

              <select
                {...register("priority")}
                className="mt-2 w-full rounded-lg border p-3"
              >
                <option>LOW</option>
                <option>MEDIUM</option>
                <option>HIGH</option>
                <option>URGENT</option>
              </select>

            </div>

            <div>

              <label>Status</label>

              <select
                {...register("status")}
                className="mt-2 w-full rounded-lg border p-3"
              >
                <option>TODO</option>
                <option>IN_PROGRESS</option>
                <option>DONE</option>
              </select>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label>Project</label>

              <select
                {...register("projectId", {
                  valueAsNumber: true,
                })}
                className="mt-2 w-full rounded-lg border p-3"
              >

                <option value="">Select Project</option>

                {projects.map((project) => (

                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.title}
                  </option>

                ))}

              </select>

            </div>

            <div>

              <label>Assign To</label>

              <select
                {...register("assignedTo", {
                  valueAsNumber: true,
                })}
                className="mt-2 w-full rounded-lg border p-3"
              >

                <option value="">Select User</option>

                {users.map((user) => (

                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.firstName} {user.lastName}
                  </option>

                ))}

              </select>

            </div>

          </div>

          <div>

            <label>Due Date</label>

            <input
              type="date"
              {...register("dueDate")}
              className="mt-2 w-full rounded-lg border p-3"
            />

          </div>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              {initialData ? "Update Task" : "Create Task"}
            </button>

          </div>

        </form>
        {initialData && (
        <CommentSection
        taskId={initialData.id}
        />
        )}

      </div>

    </div>
  );
}

export default TaskModal;