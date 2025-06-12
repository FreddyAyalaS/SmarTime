// CalendarDay.jsx
import React from 'react';
import { useDrop } from 'react-dnd';
import TaskItem from './TaskItem';

const CalendarDay = ({ dayNumber, month, year, tasks, setTasks, onDayClick }) => {

    const dateStr = dayNumber
        ? new Date(year, month, dayNumber).toISOString().split('T')[0]
        : null;

    const dayTasks = tasks.filter(task => task.date === dateStr);

    const [, drop] = useDrop({
        accept: "TASK",
        drop: (item) => {
            if (!dayNumber) return;
            const newDate = new Date(year, month, dayNumber);
            const updatedTask = { ...item, date: newDate.toISOString().split('T')[0] };

            setTasks(prev =>
                prev.map(t =>
                    t.title === item.title && t.date === item.date ? updatedTask : t
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
