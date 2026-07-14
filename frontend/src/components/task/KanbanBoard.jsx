import {
  DndContext,
  closestCorners,
} from "@dnd-kit/core";

import KanbanColumn from "./KanbanColumn";

function KanbanBoard({
  tasks,
  onEdit,
  onDelete,
  onTaskMove,
}) {
  const columns = {
    TODO: tasks.filter((t) => t.status === "TODO"),
    IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
    DONE: tasks.filter((t) => t.status === "DONE"),
  };

  function getStatus(over) {
    if (!over) return null;

    // Dropped directly on a column
    if (
      over.id === "TODO" ||
      over.id === "IN_PROGRESS" ||
      over.id === "DONE"
    ) {
      return over.id;
    }

    // Dropped on another task
    const targetTask = tasks.find((t) => t.id === over.id);

    if (targetTask) {
      return targetTask.status;
    }

    return null;
  }

  function handleDragEnd({ active, over }) {
    if (!over) return;

    const activeTask = active.data.current.task;

    const newStatus = getStatus(over);

    if (!newStatus) return;

    if (activeTask.status === newStatus) return;

    onTaskMove(activeTask.id, newStatus);
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <KanbanColumn
          title="Todo"
          status="TODO"
          tasks={columns.TODO}
          onEdit={onEdit}
          onDelete={onDelete}
        />

        <KanbanColumn
          title="In Progress"
          status="IN_PROGRESS"
          tasks={columns.IN_PROGRESS}
          onEdit={onEdit}
          onDelete={onDelete}
        />

        <KanbanColumn
          title="Done"
          status="DONE"
          tasks={columns.DONE}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </DndContext>
  );
}

export default KanbanBoard;