// src/components/TaskItem.jsx
import React from 'react';
import { useDrag } from 'react-dnd';

const TaskItem = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { ...task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="calendar-task"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="task-title">{task.title}</div>
      <div className="task-time">{task.time}</div>
      <div className="task-complexity">Nivel: {task.complexity}</div>
    </div>
  );
};

export default TaskItem;
