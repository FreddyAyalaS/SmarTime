import React, { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import GlobalStatusChart from '../components/GlobalStatusChart';
import { getTareas } from '../services/calendarService';
import { getActivities } from '../services/calendarService.mock';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [todayActivities, setTodayActivities] = useState([]);
  const [weeklyIndicators, setWeeklyIndicators] = useState([]);

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const next7Days = new Date(today);
    next7Days.setDate(today.getDate() + 7);

    const fetchTasks = async () => {
      const allTasks = await getTareas();

      // Filtrar tareas de hoy
      setTodayTasks(allTasks.filter(t => t.fechaEntrega === todayStr));

      // Filtrar próximas tareas
      setUpcomingTasks(
        allTasks.filter(t => {
          const entrega = new Date(t.fechaEntrega);
          return entrega > today && entrega <= next7Days;
        })
      );
    };

    const fetchTodayActivities = async () => {
      const all = await getActivities();

      const todayActs = all.filter(a => a.fecha === todayStr);

      const allTasks = await getTareas();
      const todayTasksAsActs = allTasks
        .filter(t => t.fechaEntrega === todayStr)
        .map(task => ({
          id: `tarea-${task.id}`,
          tipo: 'Tarea',
          title: task.titulo,
          startTime: task.horaEntrega || '00:00',
          endTime: '', // Podrías usar horaFin si lo tienes
        }));

      const allToday = [...todayActs, ...todayTasksAsActs].sort((a, b) => {
        const horaA = a.startTime || '00:00';
        const horaB = b.startTime || '00:00';
        return horaA.localeCompare(horaB);
      });

      setTodayActivities(allToday);
    };

    const fetchWeeklyIndicators = async () => {
      const tasks = await getTareas();
      const activities = await getActivities();

      const indicators = [...Array(7)].map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - today.getDay() + i + 1); // Lunes a Domingo
        const dateStr = d.toISOString().split('T')[0];

        return {
          day: d.toLocaleDateString('es-PE', { weekday: 'short' }),
          hasTask: tasks.some(t => t.fechaEntrega === dateStr),
          hasActivity: activities.some(a => a.fecha === dateStr),
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
      case 'ActividadNoAcademica': return 'act_no_academica';
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
                const horaInicio = act.startTime || '??:??';
                const horaFin = act.endTime || '??:??';
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
                  className={`weekly-day${day.hasTask ? ' has-task' : ''}${day.hasActivity ? ' has-activity' : ''}`.trim()}
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
                    Vence: {new Date(task.fechaEntrega).toLocaleDateString('es-PE', {
                      weekday: 'long',
                      day: '2-digit',
                    })}{' '}
                    {task.horaEntrega || '23:59'}
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
