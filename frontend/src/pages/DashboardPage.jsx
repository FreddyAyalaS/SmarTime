import React, { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import { getTasks } from '../services/taskService.mock';
import checkIcon from '../assets/Icons/checkcircle.svg';

const DashboardPage = () => {
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const allTasks = await getTasks();

      const todayDateStr = new Date().toISOString().split('T')[0];
      const today = new Date(todayDateStr);
      const next7Days = new Date(today);
      next7Days.setDate(today.getDate() + 7);

      const todayFiltered = allTasks.filter(
        (task) => task.fecha_entrega === todayDateStr
      );

      const upcomingFiltered = allTasks.filter((task) => {
        const entrega = new Date(task.fecha_entrega);
        return entrega > today && entrega <= next7Days;
      });

      setTodayTasks(todayFiltered);
      setUpcomingTasks(upcomingFiltered);
    };

    fetchTasks();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-summary-section">
        {/* APARTADO PARA ACTIVIDADES DE HOY  - PARTE SEBASTIAN*/}
        
        {/* PROXIMAS TAREAS */}
        <SummaryCard title="Próximas Tareas (Siguientes 7 días)">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <div key={task.id} className="dashboard-task-box">
                <strong>{task.titulo}</strong><br />
                <div className="task-deadline-text">
                  Vence:{' '}
                  {new Date(task.fecha_entrega).toLocaleDateString('es-PE', {
                    weekday: 'long',
                    day: '2-digit',
                  })}{' '}
                  {task.hora_entrega || '23:59'}
                </div>
                <div>
                  <img
                    src={checkIcon}
                    alt="Check"
                    className="task-status-icon"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="dashboard-no-tasks">No hay tareas próximas.</p>
          )}
        </SummaryCard>
      </div>
    </div>
  );
};

export default DashboardPage;
