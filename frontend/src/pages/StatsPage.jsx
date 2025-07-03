// src/pages/StatsPage.jsx
import React from 'react';
import SummaryCard from '../components/SummaryCard';
import '../styles/StatsPage.css'; // Estilos propios para esta página

const StatsPage = () => {
  return (
    <div className="stats-page">
      <div className="stats-grid">

        {/* CARD 1 */}
        <div className="stats-grid-cell">
          <SummaryCard title="Estadística 1" className="card-stats">
            <p>Contenido estadístico aquí</p>
          </SummaryCard>
        </div>

        {/* CARD 2 */}
        <div className="stats-grid-cell">
          <SummaryCard title="Estadística 2" className="card-stats">
            <p>Contenido estadístico aquí</p>
          </SummaryCard>
        </div>

        {/* CARD 3 */}
        <div className="stats-grid-cell">
          <SummaryCard title="Estadística 3" className="card-stats">
            <p>Contenido estadístico aquí</p>
          </SummaryCard>
        </div>

        {/* CARD 4 */}
        <div className="stats-grid-cell">
          <SummaryCard title="Estadística 4" className="card-stats">
            <p>Contenido estadístico aquí</p>
          </SummaryCard>
        </div>

      </div>
    </div>
  );
};

export default StatsPage;
