// src/components/TaskForm.jsx
import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onClose, onSave }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    course: '',
    description: '',
    date: '',
    time: '',
    complexity: 0,
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleComplexityClick = (level) => {
    setTaskData({ ...taskData, complexity: level });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(taskData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Tarea:</h2>
        <input type="text" name="title" placeholder="Título de la tarea" value={taskData.title} onChange={handleChange} required />
        <input type="text" name="course" placeholder="Curso" value={taskData.course} onChange={handleChange} required />
        <textarea name="description" placeholder="Añade una descripción" value={taskData.description} onChange={handleChange} />
        <input type="date" name="date" value={taskData.date} onChange={handleChange} required />
        <input type="time" name="time" value={taskData.time} onChange={handleChange} required />
        
        <div className="complexity">
          <span>Complejidad:</span>
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              type="button"
              key={level}
              className={taskData.complexity === level ? 'selected' : ''}
              onClick={() => handleComplexityClick(level)}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="buttons">
          <button type="submit" className="save-btn">Guardar</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
