// src/pages/DashboardPage.jsx
import { upComingTask } from '../data/UpComingTask'; // Nota: importamos desde 'data'
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <div className="upcoming-tasks-section">
        <h1 className="upcoming-tasks-title">Próximas tareas (7 días)</h1>
        
        {upComingTask.map(task => (
          <div key={task.id} className="task-item">
            <div className="task-title">
              {task.title} - {task.subject}
            </div>
            <div className="task-deadline">
              <strong>Vence:</strong> {task.dueDay}, {task.dueTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;