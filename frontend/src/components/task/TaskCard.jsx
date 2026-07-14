import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";

import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  const { user } = useAuth();

  const role = user?.role?.name ?? "";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="mb-4 flex items-center justify-between">

        <PriorityBadge priority={task.priority} />

        <StatusBadge status={task.status} />

      </div>

      <h3 className="text-lg font-semibold text-slate-800">
        {task.title}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {task.description}
      </p>

      <div className="mt-5 space-y-2 text-sm">

        <div>
          <span className="font-semibold">
            Project:
          </span>{" "}
          {task.project?.title ?? "-"}
        </div>

        <div>
          <span className="font-semibold">
            Assigned:
          </span>{" "}
          {task.assignee
            ? `${task.assignee.firstName} ${task.assignee.lastName}`
            : "-"}
        </div>

      </div>

      <div className="mt-5 flex items-center justify-between">

        <div className="flex items-center gap-2 text-sm text-gray-500">

          <FaCalendarAlt />

          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No Due Date"}

        </div>

        {/* Hide Edit/Delete for Team Members */}

        {role !== "TEAM_MEMBER" && (
          <div className="flex gap-3">

            <button
              onClick={() => onEdit(task)}
              className="text-blue-600 transition hover:text-blue-800"
              title="Edit Task"
            >
              <FaEdit />
            </button>

            <button
              onClick={() => onDelete(task)}
              className="text-red-600 transition hover:text-red-800"
              title="Delete Task"
            >
              <FaTrash />
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default TaskCard;