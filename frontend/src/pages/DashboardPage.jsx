// src/pages/DashboardPage/DashboardPage.jsx
import React from 'react';
// import './DashboardPage.css'; // O .module.css

import SummaryCard from '../components/SummaryCard';
import ActivityItem from '../components/ActivityItem';
import { todayActivitiesData } from '../data/todayActivitiesData';
// Importa los datos mock desde la carpeta data/

// import { upcomingTasksData } from '../../data/upcomingTasksData'; // Si vas a mostrar esta sección también

const DashboardPage = () => {
  const pageClasses = "dashboard-page";
  const summarySectionClasses = "dashboard-summary-section";

  return (
    <div className={pageClasses}>
      <div className={summarySectionClasses}>
        <SummaryCard title="Actividades (Hoy)">
          {todayActivitiesData.map(activity => (
            <ActivityItem
              key={activity.id}
              startTime={activity.startTime}
              endTime={activity.endTime}
              title={activity.title}
              categoryColor={activity.categoryColor}
            />
          ))}
        </SummaryCard>

        {/* 
        // Ejemplo para la tarjeta de "Próximas Tareas"
        // Necesitarías crear un componente PendingTaskItem.jsx similar a ActivityItem.jsx
        <SummaryCard title="Próximas Tareas (7 días)">
          {upcomingTasksData.map(task => (
            // <PendingTaskItem key={task.id} taskData={task} />
            <div key={task.id} style={{ padding: '10px', margin: '5px 0', backgroundColor: '#60A5FA', color: 'white', borderRadius: '8px' }}>
              <strong>{task.title}</strong><br/>
              <span>{task.dueDateText}</span>
              <span style={{ float: 'right', fontSize: '1.5em' }}>✓</span> {}
            </div>
          ))}
        </SummaryCard>
        */}
      </div>
    </div>
  );
};

export default DashboardPage;