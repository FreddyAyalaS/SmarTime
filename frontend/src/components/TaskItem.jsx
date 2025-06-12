// src/components/TaskItem.jsx
import React from 'react';
import { useDrag } from 'react-dnd';

const getColorByType = (type) => {
  switch (type) {
    case 'Tarea': return '#4A90E2';
    case 'Estudio': return '#2ECC71';
    case 'Evento': return '#F39C12';
    case 'Act. no académica': return '#95A5A6';
    default: return '#cccccc';
  }
};

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
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: getColorByType(task.type),
        color: '#fff',
        padding: '5px',
        borderRadius: '5px',
        marginBottom: '5px',
        cursor: 'grab',
      }}
    >
      <div className="task-title">{task.title}</div>
      <div className="task-time">{task.time}</div>
      <div className="task-complexity">Nivel: {task.complexity}</div>
    </div>
  );
};

export default TaskItem;
