import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import './Calendar.css';
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import CalendarDay from './components/CalendarDay';



const Calendar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const toggleOptions = () => setShowOptions(!showOptions);

  const handleOptionClick = (type) => {
    if (type === "Tarea") {
      setShowTaskForm(true);
    }
    setShowOptions(false);
  };

  const [tasks, setTasks] = useState([]);

  const handleSaveTask = (taskData) => {
    setTasks([...tasks, taskData]);
  };


  const days = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h1>Calendario</h1>
        <div className="create-container">
          <button className="create-btn" onClick={toggleOptions}>
            Crear actividad ➕
          </button>
          {showOptions && (
            <div className="activity-options">
              <button className="option blue" onClick={() => handleOptionClick("Tarea")}>Tarea</button>
              <button className="option green">Estudio</button>
              <button className="option orange">Evento</button>
              <button className="option gray">Act. no académica</button>
            </div>
          )}
        </div>
      </div>

      <div className="calendar-grid">
        {days.map((day, i) => (
          <CalendarDay
            key={i}
            day={day}
            index={i}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}



      </div>

      {showTaskForm && (
        <TaskForm onClose={() => setShowTaskForm(false)} onSave={handleSaveTask} />
      )}
    </div>
  );
};

export default Calendar;
