// src/components/TaskItemT.jsx
import React from 'react';
import '../styles/TaskItem.css';

const CheckIcon = () => <span className="task-action-icon">✓</span>;
const TrashIcon = () => <span className="task-action-icon">🗑️</span>;
const EditIcon = () => <span className="task-action-icon">✏️</span>;

const TaskItemT = ({ task, onToggleComplete, onDelete, onSetStatus, onEdit }) => {
  const rowClasses = `task-item-row ${task.completado ? 'task-completed' : ''}`;
  const statusButtonContainerClasses = "task-item-status-buttons";
  const statusButtonClasses = "status-button";
  const statusButtonActiveClasses = "active";
  const actionsContainerClasses = "task-item-actions";
  const actionButtonClasses = "task-action-button";

  const handleStatusClick = (newStatus) => {
    if (task.estado !== newStatus) {
      onSetStatus(task.id, newStatus);
    }
  };

  return (
    <tr className={rowClasses}>
      <td>{task.titulo || 'Sin título'}</td>
      <td>{task.curso || 'N/A'}</td>
      <td>{task.complejidad || 'N/A'}</td> {/* ✅ Campo actualizado */}
      <td className={statusButtonContainerClasses}>
        <button
          className={`${statusButtonClasses} ${task.estado === 'inicio' ? statusButtonActiveClasses : ''} status-inicio`}
          onClick={() => handleStatusClick('inicio')}
          disabled={task.estado === 'inicio'}
        >
          Inicio
        </button>
        <button
          className={`${statusButtonClasses} ${task.estado === 'en_desarrollo' ? statusButtonActiveClasses : ''} status-en-desarrollo`}
          onClick={() => handleStatusClick('en_desarrollo')}
          disabled={task.estado === 'en_desarrollo'}
        >
          En Desarrollo
        </button>
        <button
          className={`${statusButtonClasses} ${task.estado === 'finalizado' ? statusButtonActiveClasses : ''} status-finalizado`}
          onClick={() => handleStatusClick('finalizado')}
          disabled={task.estado === 'finalizado'}
        >
          Finalizado
        </button>
      </td>
      <td className={actionsContainerClasses}>
        <button
          onClick={() => onToggleComplete(task.id, task.completado)}
          className={`${actionButtonClasses} complete-button ${task.completado ? 'completed' : ''}`}
          aria-label={task.completado ? "Marcar como pendiente" : "Marcar como completado"}
        >
          <CheckIcon />
        </button>
        {/* Botón de editar (habilitado si lo necesitas) */}
        {/* <button onClick={() => onEdit(task)} className={`${actionButtonClasses} edit-button`} aria-label="Editar tarea">
          <EditIcon />
        </button> */}
        <button onClick={() => onDelete(task.id)} className={`${actionButtonClasses} delete-button`} aria-label="Eliminar tarea">
          <TrashIcon />
        </button>
      </td>
    </tr>
  );
};

export default TaskItemT;
