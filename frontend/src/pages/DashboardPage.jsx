// src/pages/DashboardPage/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import GlobalStatusChart from '../components/GlobalStatusChart';
import { getTasks } from '../services/taskServiceSelector';
import { getActivities } from '../services/calendarService.mock';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [todayActivities, setTodayActivities] = useState([]);
  const [weeklyIndicators, setWeeklyIndicators] = useState([]);

  useEffect(() => {
  // 🚨 Simulamos que hoy es 2025-06-30 (por pruebas con datos mock)
  const todayStr = '2025-06-30';
  const today = new Date(todayStr);
  const next7Days = new Date(today);
  next7Days.setDate(today.getDate() + 7);

  const fetchTasks = async () => {
    const allTasks = await getTasks();
    setTodayTasks(allTasks.filter(t => t.fecha_entrega === todayStr));
    setUpcomingTasks(allTasks.filter(t => {
      const entrega = new Date(t.fecha_entrega);
      return entrega > today && entrega <= next7Days;
    }));
  };

  const fetchTodayActivities = async () => {
    const all = await getActivities();

    const todayFiltered = all.filter((a) => {
      const fecha = a.realizationDate || a.fecha; // Unificamos ambas fechas
      return fecha === todayStr;
    });

    const sorted = todayFiltered.sort((a, b) => {
      const horaA = a.startTime || a.hInicio || '00:00';
      const horaB = b.startTime || b.hInicio || '00:00';
      return horaA.localeCompare(horaB);
    });

    setTodayActivities(sorted);
  };

  const fetchWeeklyIndicators = async () => {
    const tasks = await getTasks();
    const activities = await getActivities();
    const indicators = [...Array(7)].map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - today.getDay() + 1 + i); // Lunes a Domingo
      const dateStr = d.toISOString().split('T')[0];

      return {
        day: d.toLocaleDateString('es-PE', { weekday: 'short' }),
        hasTask: tasks.some(t => t.fecha_tarea === dateStr && !t.completado),
        hasActivity: activities.some(a => (a.realizationDate || a.fecha) === dateStr),
      };
    });
    setWeeklyIndicators(indicators);
  };

  fetchTasks();
  fetchTodayActivities();
  fetchWeeklyIndicators();
}, []);

  const normalizeTypeClass = (tipo) => {
    switch (tipo) {
      case 'Tarea': return 'tarea';
      case 'Estudio': return 'estudio';
      case 'Clase': return 'clase';
      case 'Act. no académica': return 'act_no_academica';
      default: return '';
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-grid">
        {/* ACTIVIDADES DE HOY */}
        <div className="dashboard-grid-cell">
          <SummaryCard title="Actividades de Hoy" className="card-actividades">
            {todayActivities.length > 0 ? (
              todayActivities.map((act) => {
                const horaInicio = act.startTime || act.hInicio || '??:??';
                const horaFin = act.endTime || act.hFin || '??:??';
                const contenido = act.title || act.temas || act.description || act.course;

                return (
                  <div key={act.id} className={`dashboard-task-box2 ${normalizeTypeClass(act.tipo)}`}>
                    <div className="task-title">{contenido}</div>
                    <div className="task-deadline-text">{horaInicio} - {horaFin}</div>
                  </div>
                );
              })
            ) : (
              <p className="dashboard-no-tasks">No hay actividades para hoy.</p>
            )}
          </SummaryCard>
        </div>

        {/* VISTA SEMANAL */}
        <div className="dashboard-grid-cell">
          <SummaryCard title="Vista Semanal" className="card-vista">
            <div className="weekly-view">
              {weeklyIndicators.map((day, i) => (
                <div
                  key={i}
                  className={`weekly-day${day.hasTask ? ' has-task' : ''}${day.hasActivity ? ' has-activity' : ''}`.trim().replace(/\s+/g, ' ')}
                >
                  {day.day.charAt(0).toUpperCase() + day.day.slice(1)}
                </div>
              ))}
            </div>
          </SummaryCard>
        </div>


        {/* PRÓXIMAS TAREAS */}
        <div className="dashboard-grid-cell">
          <SummaryCard title="Próximas Tareas (Siguientes 7 días)" className="card-proximas">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
                <div key={task.id} className="dashboard-task-box tarea">
                  <strong>{task.titulo}</strong><br />
                  <div className="task-deadline-text">
                    Vence: {new Date(task.fecha_entrega).toLocaleDateString('es-PE', {
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

        {/* ESTADO GLOBAL */}
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
