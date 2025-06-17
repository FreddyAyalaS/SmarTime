// src/components/ActivityModal.jsx
import React from 'react';
import '../styles/ActivityModal.css';

const getColorByType = (type) => {
  switch (type) {
    case 'Tarea': return '#4A90E2';
    case 'Estudio': return '#2ECC71';
    case 'Evento': return '#F39C12';
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
            <br />
            <strong>Título:</strong> {task.title} <br />
            <strong>Curso:</strong> {task.course} <br />
            <strong>Hora:</strong> {task.time} <br />
            <strong>Complejidad:</strong> {task.complexity} <br />
            <strong>Descripción:</strong> {task.description} <br />
          </div>
        ))}
        <button onClick={onClose} className="close-btn">Cerrar</button>
      </div>
    </div>
  );
};

export default ActivityModal;
