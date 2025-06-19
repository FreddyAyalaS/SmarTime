// src/components/ActivityModal.jsx
import React from 'react';
import '../styles/ActivityModal.css';

const getColorByType = (type) => {
  switch (type) {
    case 'Tarea': return '#4A90E2';
    case 'Estudio': return '#2ECC71';
    case 'Clase': return '#F39C12';
    case 'Act. no académica': return '#95A5A6';
    default: return '#cccccc';
  }
};

const ActivityModal = ({ activities, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="activity-modal">
        <h2>Actividades del día</h2>

        {activities.map((task, index) => (
          <div
            key={index}
            className="activity-detail"
            style={{
              borderLeft: `8px solid ${getColorByType(task.type)}`,
              paddingLeft: '10px',
              marginBottom: '10px',
              backgroundColor: '#f9f9f9',
              borderRadius: '5px',
            }}
          >
            <strong style={{ color: getColorByType(task.type) }}>
              {task.type}
            </strong>

            {/* Título para tareas, estudios y actividades no académicas */}
            {task.title && (
              <>
                <br />
                <strong>Título:</strong> {task.title}
              </>
            )}

            {/* Curso (Tarea, Estudio, Clase) */}
            {task.course && (
              <>
                <br />
                <strong>Curso:</strong> {task.course}
              </>
            )}

            {/* Hora: entrega (Tarea), hInicio/hFin (otros) */}
            {(task.deliveryTime || (task.hInicio && task.hFin)) && (
              <>
                <br />
                <strong>Hora:</strong>{' '}
                {task.deliveryTime
                  ? task.deliveryTime
                  : `${task.hInicio || '??'} - ${task.hFin || '??'}`}
              </>
            )}

            {/* Complejidad solo en Tarea */}
            {task.complexity && task.type === 'Tarea' && (
              <>
                <br />
                <strong>Complejidad:</strong> {task.complexity}
              </>
            )}

            {/* Temas solo para Estudio */}
            {task.temas && task.type === 'Estudio' && (
              <>
                <br />
                <strong>Temas:</strong> {task.temas}
              </>
            )}

            {/* Repetición (Clase y No académica) */}
            {task.repetir && (
              <>
                <br />
                <strong>Repite:</strong> {task.semanas || 1} semana(s)
              </>
            )}

            {/* Descripción */}
            {task.description && (
              <>
                <br />
                <strong>Descripción:</strong> {task.description}
              </>
            )}
          </div>
        ))}

        <button onClick={onClose} className="close-btn">Cerrar</button>
      </div>
    </div>
  );
};

export default ActivityModal;
