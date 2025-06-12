// src/components/ReminderItem.jsx
import React from 'react';

const ReminderItem = ({ reminder }) => {
  return (
    <div className="reminder-item" style={{ borderLeft: `4px solid ${reminder.color}` }}>
      <h3>{reminder.title}</h3>
      <p><strong>Vence:</strong> {reminder.dueDate} a las {reminder.dueTime}</p>
      <hr className="reminder-divider" />
    </div>
  );
};

export default ReminderItem;