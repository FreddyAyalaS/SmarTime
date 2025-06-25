// src/components/GlobalStatusChart.jsx
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getTasks } from '../services/taskService.mock';
import '../styles/GlobalStatusChart.css'; // Make sure this import is correct

const COLORS = {
  inicio: '#F16868', // Naranja claro
  en_desarrollo: '#F6B03B', // Azul claro
  finalizado: '#3FC699', // Verde
};

// Custom Legend Component - Make sure this is defined OUTSIDE the main component
const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <ul className="custom-legend">
      {
        payload.map((entry, index) => (
          <li key={`item-${index}`}>
            <span className="legend-dot" style={{ backgroundColor: entry.color }}></span>
            {/* The 'name' from your chartData is in entry.value when using dataKey="name" in Pie */}
            {entry.value}
          </li>
        ))
      }
    </ul>
  );
};


const GlobalStatusChart = () => {
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allTasks = await getTasks();
      const counts = {
        inicio: 0,
        en_desarrollo: 0,
        finalizado: 0,
      };

      allTasks.forEach((task) => {
        if (counts[task.estado] !== undefined) {
          counts[task.estado]++;
        }
      });

      const chartData = Object.entries(counts).map(([key, value]) => ({
        name: key.replace('_', ' ').toUpperCase(), // This is the 'name'
        value, // This is the numerical value for the pie slice
        color: COLORS[key],
      }));

      setStatusData(chartData);
    };

    fetchData();
  }, []);

  return (
    // This is the key change: global-status-chart-container now wraps PieChart AND CustomLegend
    <div className="global-status-chart-container">
      <PieChart width={250} height={250}>
        <Pie
          data={statusData}
          dataKey="value" // This is the numerical value for the slice size
          nameKey="name"  // This is the label for the slice and for the legend item name
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {statusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        {/* Remove the Recharts Legend component entirely here.
            We will render our CustomLegend component directly as a sibling to PieChart. */}
        {/* <Legend content={<CustomLegend />} />  <-- REMOVE THIS LINE */}
      </PieChart>

      {/* Render your custom legend directly here, as a sibling to the PieChart */}
      {statusData.length > 0 && <CustomLegend payload={statusData.map(d => ({ value: d.name, color: d.color }))} />}
    </div>
  );
};

export default GlobalStatusChart;