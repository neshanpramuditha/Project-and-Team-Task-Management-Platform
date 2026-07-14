import TaskColumn from "./TaskColumn";

function TaskBoard({
  tasks,
  onEdit,
  onDelete,
}) {

  return (

    <div className="grid gap-6 lg:grid-cols-3">

      <TaskColumn
        title="Todo"
        tasks={
          tasks.filter(
            t => t.status === "TODO"
          )
        }
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TaskColumn
        title="In Progress"
        tasks={
          tasks.filter(
            t => t.status === "IN_PROGRESS"
          )
        }
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TaskColumn
        title="Done"
        tasks={
          tasks.filter(
            t => t.status === "DONE"
          )
        }
        onEdit={onEdit}
        onDelete={onDelete}
      />

    </div>

  );

}

export default TaskBoard;