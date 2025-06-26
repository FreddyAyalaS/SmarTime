// src/pages/DashboardPage/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import { getTasks } from '../services/taskService.mock';
import checkIcon from '../assets/Icons/checkcircle.svg';
import GlobalStatusChart from '../components/GlobalStatusChart';

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
      <div className="dashboard-grid">
        {/* 1. ACTIVIDADES DE HOY */}
        <div className="dashboard-grid-cell">
          <SummaryCard title="Actividades de Hoy" className="card-actividades">
            {/* Aquí se insertarán las actividades de Sebastián */}
          </SummaryCard>
        </div>

        {/* 2. VISTA SEMANAL */}
        <div className="dashboard-grid-cell">
          <SummaryCard title="Vista Semanal" className="card-vista">
            {/* Aquí se insertará la vista semanal del calendario */}
          </SummaryCard>
        </div>

        {/* 3. PRÓXIMAS TAREAS */}
        <div className="dashboard-grid-cell">
          <SummaryCard title="Próximas Tareas (Siguientes 7 días)" className="card-proximas">
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
                </div>
              ))
            ) : (
              <p className="dashboard-no-tasks">No hay tareas próximas.</p>
            )}
          </SummaryCard>
        </div>

        {/* 4. ESTADO GLOBAL */}
        <div className="dashboard-grid-cell">
          <SummaryCard title="Estado Global de Actividades" className="card-global">
            <GlobalStatusChart />
          </SummaryCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
