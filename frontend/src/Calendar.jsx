
// Calendar.jsx
import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import './Calendar.css';
import CalendarDay from './components/CalendarDay';
import ActivityModal from './components/ActivityModal';



const Calendar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const toggleOptions = () => setShowOptions(!showOptions);
  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const handleOptionClick = (type) => {
    setSelectedType(type);
    setShowTaskForm(true);
    setShowOptions(false);
  };

  // En handleSaveTask:
  const handleSaveTask = (taskData) => {
    const taskWithType = {
      ...taskData,
      type: selectedType,
      id: generateId(), // asignar id único
    };
    setTasks([...tasks, taskWithType]);
  };

  // Para generar el arreglo de días del mes
  const getMonthDays = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 = domingo, 1 = lunes...
    const daysInMonth = lastDayOfMonth.getDate();

    const days = [];

    // Rellenar días vacíos antes del primer día
    const prevDays = (firstDayOfWeek + 6) % 7;
    for (let i = 0; i < prevDays; i++) {
      days.push(null);
    }

    // Agregar los días reales del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };

  const monthDays = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());
  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>{'<'}</button>
        <h1>{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</h1>
        <button onClick={handleNextMonth}>{'>'}</button>

        <div className="create-container">
          <button className="create-btn" onClick={toggleOptions}>
            Crear actividad ➕
          </button>
          {showOptions && (
            <div className="activity-options">
              <button className="option blue" onClick={() => handleOptionClick("Tarea")}>Tarea</button>
              <button className="option green" onClick={() => handleOptionClick("Estudio")}>Estudio</button>
              <button className="option orange" onClick={() => handleOptionClick("Evento")}>Evento</button>
              <button className="option gray" onClick={() => handleOptionClick("Act. no académica")}>Act. no académica</button>
            </div>
          )}
        </div>
      </div>

      <div className="calendar-grid">
        {/* Cabecera de días */}
        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dayName, i) => (
          <div key={i} className="calendar-day-name">
            {dayName}
          </div>
        ))}

        {/* Días del mes */}
        {monthDays.map((dayNumber, index) => (
          <CalendarDay
            key={index}
            dayNumber={dayNumber}
            month={currentDate.getMonth()}
            year={currentDate.getFullYear()}
            tasks={tasks}
            setTasks={setTasks}
            onDayClick={(dayTasks) => {
              setSelectedDayTasks(dayTasks);
              setShowActivityModal(true);
            }}
          />

        ))}
      </div>

      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onSave={handleSaveTask}
          type={selectedType}
        />

      )}


      {showActivityModal && (
        <ActivityModal
          activities={selectedDayTasks}
          onClose={() => setShowActivityModal(false)}
        />
      )}

    </div>
  );
};

export default Calendar;
