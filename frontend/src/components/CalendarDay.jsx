import React from 'react';
import { useDrop } from 'react-dnd';
import TaskItem from './TaskItem';

const CalendarDay = ({ dayNumber, month, year, tasks = [], setTasks, onDayClick }) => {
  const dateStr = dayNumber
    ? new Date(year, month, dayNumber).toISOString().split('T')[0]
    : null;

  const getTaskCalendarDate = (task) => {
    if (task.type === 'Tarea') return task.realizationDate;
    if (task.fecha) return task.fecha;
    if (task.date) return task.date;
    return null;
  };

  const dayTasks = tasks.filter(task => getTaskCalendarDate(task) === dateStr);

  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (!dayNumber) return;
      const newDate = new Date(year, month, dayNumber).toISOString().split('T')[0];
      const updatedTask = {
        ...item,
        ...(item.type === 'Tarea'
          ? { realizationDate: newDate }
          : { fecha: newDate }),
      };

      setTasks(prev =>
        prev.map(t =>
          t.title === item.title && getTaskCalendarDate(t) === getTaskCalendarDate(item)
            ? updatedTask
            : t
        )
      );
    },
  });

  const handleDayClick = () => {
    if (dayTasks.length > 0 && onDayClick) {
      onDayClick(dayTasks);
    }
  };

  return (
    <div ref={drop} className="calendar-day" onClick={handleDayClick}>
      <div className="day-number">{dayNumber}</div>
      <div className="calendar-cells">
        {dayTasks.map((task, i) => (
          <TaskItem key={i} task={task} />
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
