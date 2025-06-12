// src/components/RemindersList.jsx
import React from 'react';
import ReminderItem from './ReminderItem';

const RemindersList = ({ reminders }) => {
  return (
    <div className="reminders-container">
      {reminders.map(reminder => (
        <ReminderItem 
          key={reminder.id}
          reminder={reminder} // Pasa el objeto completo
        />
      ))}
    </div>
  );
};

export default RemindersList;