import React from 'react';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';
import TaskItem from './TaskItem';

const CalendarDay = ({ day, index, tasks, setTasks }) => {
    const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate.getDay() === (index + 1) % 7;
    });

    const [, drop] = useDrop({
        accept: "TASK",
        drop: (item) => {
            const newDate = new Date(item.date);
            const diff = ((index + 1) % 7) - newDate.getDay();
            newDate.setDate(newDate.getDate() + diff);

            const updatedTask = { ...item, date: newDate.toISOString().split('T')[0] };
            setTasks(prev =>
                prev.map(t =>
                    t.title === item.title && t.date === item.date ? updatedTask : t
                )
            );
        }
    });

    return (
        <div ref={drop} className="calendar-day">
            <strong>{day}</strong>
            <div className="calendar-cells">
                {dayTasks.map((task, i) => (
                    <TaskItem key={i} task={task} />
                ))}
            </div>
        </div>
    );
};

export default CalendarDay;
