import React, { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const StatsPage = () => {
  // Estado para tareas completadas/pendientes
  const [tareasStats, setTareasStats] = useState(null);

  // Estado para historial de estrellas
  const [historialEstrellas, setHistorialEstrellas] = useState([]);

  // Estado para filtros de fecha (solo para estrellas)
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  // Cargar tareas completadas/pendientes al montar
  useEffect(() => {
    axios.get(`${API_BASE}/tareas/api/tareas-completadas-pendientes/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
      .then(res => setTareasStats(res.data))
      .catch(() => setTareasStats(null));
  }, []);

  // Cargar historial de estrellas (todas las semanas)
  useEffect(() => {
    axios.get(`${API_BASE}/gamificacion/api/historial-estrellas/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
      .then(res => setHistorialEstrellas(res.data))
      .catch(() => setHistorialEstrellas([]));
  }, []);

  // Filtrar historial de estrellas por fechas seleccionadas
  const estrellasFiltradas = historialEstrellas.filter(item => {
    if (!fechaInicio && !fechaFin) return true;
    const ini = fechaInicio ? new Date(fechaInicio) : null;
    const fin = fechaFin ? new Date(fechaFin) : null;
    const semana = new Date(item.semana_inicio);
    return (!ini || semana >= ini) && (!fin || semana <= fin);
  });

  return (
    <div className="stats-page">
      <div className="stats-grid">

        {/* CARD 1: Tareas completadas vs pendientes */}
        <div className="stats-grid-cell">
          <SummaryCard title="Tareas por Curso" className="card-stats">
            {tareasStats ? (
              <BarChart width={300} height={200} data={[
                { name: 'Completadas', value: tareasStats.completadas },
                { name: 'Pendientes', value: tareasStats.pendientes }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            ) : (
              <p>Cargando...</p>
            )}
          </SummaryCard>
        </div>

        {/* CARD 2: (puedes dejarla igual o poner otra estadística) */}
        <div className="stats-grid-cell">
          <SummaryCard title="Estadística 2" className="card-stats">
            <p>Contenido estadístico aquí</p>
          </SummaryCard>
        </div>

        {/* CARD 3: Progreso acumulativo de estrellas */}
        <div className="stats-grid-cell">
          <SummaryCard title="Progreso Acumulativo de Estrellas" className="card-stats">
            <div style={{ marginBottom: 10 }}>
              <label>Fecha inicio: <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} /></label>
              <label style={{ marginLeft: 10 }}>Fecha fin: <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} /></label>
            </div>
            {estrellasFiltradas.length > 0 ? (
              <LineChart width={350} height={200} data={estrellasFiltradas.map(item => ({
                fecha: item.semana_inicio,
                estrellas: item.estrellas
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="estrellas" stroke="#8884d8" />
              </LineChart>
            ) : (
              <p>No hay datos para mostrar</p>
            )}
          </SummaryCard>
        </div>

        {/* CARD 4: (puedes dejarla igual o poner otra estadística) */}
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