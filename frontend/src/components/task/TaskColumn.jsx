import TaskCard from "./TaskCard";

function TaskColumn({
  title,
  tasks,
  onEdit,
  onDelete,
}) {
  return (

    <div className="rounded-2xl bg-slate-100 p-4">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-bold">

          {title}

        </h2>

        <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">

          {tasks.length}

        </span>

      </div>

      <div className="space-y-4">

        {

          tasks.map(task => (

            <TaskCard

              key={task.id}

              task={task}

              onEdit={onEdit}

              onDelete={onDelete}

            />

          ))

        }

      </div>

    </div>

  );

}

export default TaskColumn;