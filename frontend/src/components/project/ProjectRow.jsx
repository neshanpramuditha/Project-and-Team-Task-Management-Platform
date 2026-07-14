import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import ProjectStatusBadge from "./ProjectStatusBadge";

function ProjectRow({
  project,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b hover:bg-slate-50 transition">

      <td className="px-6 py-4 font-medium">
        {project.code}
      </td>

      <td className="px-6 py-4">
        {project.title}
      </td>

      <td className="px-6 py-4">
        <ProjectStatusBadge
          status={project.status}
        />
      </td>

      <td className="px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="h-2 w-28 rounded-full bg-gray-200">

            <div
              className="h-2 rounded-full bg-blue-600"
              style={{
                width: `${project.progress}%`,
              }}
            />

          </div>

          <span className="text-sm text-gray-600">
            {project.progress}%
          </span>

        </div>

      </td>

      <td className="px-6 py-4">

        <div className="flex gap-3">

          <button
            onClick={() => onEdit(project)}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(project)}
            className="text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>

        </div>

      </td>

    </tr>
  );
}

export default ProjectRow;