// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import './App.css';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LandingPageScroll from './pages/LandingPageScroll'; // 👉 nuevo componente unificado
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';

// Layout
import Layout from './components/Layout';

// Placeholder temporal para Dashboard

// Página para rutas no encontradas
const NotFoundPagePlaceholder = () => (
  <div className="page-placeholder">
    <h1>404 - Página no encontrada</h1>
    <Link to="/">Volver al inicio</Link>
  </div>
);

// Simulación de autenticación
const isAuthenticated = () => true;

// Ruta protegida
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
        <Route path="/landing" element={<LandingPageScroll />} /> {/* 👈 nueva landing con scroll */}

        {/* Rutas protegidas dentro del layout */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/calendario" element={<CalendarPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Ruta no encontrada */}
        <Route path="*" element={<NotFoundPagePlaceholder />} />
      </Routes>
    </Router>
  );
}

export default App;
