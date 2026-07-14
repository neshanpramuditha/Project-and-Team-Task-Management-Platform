import ProjectRow from "./ProjectRow";

function ProjectTable({
  projects,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-200">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Code
            </th>

            <th className="px-6 py-4 text-left">
              Project
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Progress
            </th>

            <th className="px-6 py-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {projects.map((project) => (

            <ProjectRow
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProjectTable;