// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, /* Outlet, */ Navigate, useLocation } from 'react-router-dom'; // Ya no necesitamos Outlet aquí directamente
import './App.css';
import LoginPage from './pages/LoginPage'; // Asume que están en src/pages/NombrePagina/NombrePagina.jsx
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // <--- IMPORTA LA NUEVA PÁGINA
import Layout from './components/Layout'; // Asume que Layout.jsx está en src/components/Layout/Layout.jsx
import SettingsPage from './pages/SettingsPage';

// Placeholder temporal para dashboard (puedes reemplazarlo por DashboardPage)
const DashboardPagePlaceholder = () => (
  <div className="page-placeholder"> {/* Usa la clase de App.css */}
    <h1>Dashboard</h1>
    {/* Aquí podrías empezar a usar tus componentes Card, etc. */}
  </div>
);

// Página para rutas no encontradas
const NotFoundPagePlaceholder = () => (
  <div className="page-placeholder"> {/* Usa la clase de App.css */}
    <h1>404 - Página no encontrada</h1>
    <Link to="/">Volver al inicio</Link>
  </div>
);

// Función que simula autenticación
const isAuthenticated = () => false; // Cambia para probar la redirección a /login

// Ruta protegida: redirige si no está autenticado
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Rutas privadas dentro del layout */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPagePlaceholder />} />
          <Route path="/settings" element={<SettingsPage />} /> {/* <--- AÑADE LA RUTA */}
          {/* Aquí añadirías otras rutas protegidas:
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          etc.
          */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Ruta no encontrada */}
        <Route path="*" element={<NotFoundPagePlaceholder />} />
      </Routes>
    </Router>
  );
}

export default App;