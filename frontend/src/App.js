// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout'; // NUEVO

// Placeholder temporal para dashboard (puedes reemplazarlo por DashboardPage)
const DashboardPagePlaceholder = () => (
  <div className="page-placeholder">
    <h1>Dashboard</h1>
  </div>
);

// Página para rutas no encontradas
const NotFoundPagePlaceholder = () => (
  <div className="page-placeholder">
    <h1>404 - Página no encontrada</h1>
    <Link to="/">Volver al inicio</Link>
  </div>
);

// Función que simula autenticación
const isAuthenticated = () => true;

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

        {/* Rutas privadas dentro del layout */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPagePlaceholder />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Ruta no encontrada */}
        <Route path="*" element={<NotFoundPagePlaceholder />} />
      </Routes>
    </Router>
  );
}

export default App;
