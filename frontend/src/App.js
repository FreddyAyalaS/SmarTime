import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import './App.css';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LandingPageScroll from './pages/LandingPageScroll'; // 👉 nueva landing con scroll
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
// Layout
import Layout from './components/Layout';

// Página para rutas no encontradas
const NotFoundPagePlaceholder = () => (
  <div className="page-placeholder">
    <h1>404 - Página no encontrada</h1>
    <Link to="/">Volver al inicio</Link>
  </div>
);

// 🔁 CAMBIAR SEGÚN MODO DE TRABAJO:
// ====> ✅ USAR BACKEND:
<<<<<<< HEAD
 const isAuthenticated = () => {
   const token = localStorage.getItem('authToken');
   return !!token; // true si existe token
 };

// ====> ✅ SOLO FRONTEND (desarrollo sin backend):
//const isAuthenticated = () => true; // <-- Simula usuario autenticado
=======
// const isAuthenticated = () => {
//   const token = localStorage.getItem('authToken');
//   return !!token; // true si existe token
// };

// ====> ✅ SOLO FRONTEND (desarrollo sin backend):
const isAuthenticated = () => true; // <-- Simula usuario autenticado
>>>>>>> 6a11a41f344a5223d06bb06fabd17f650b0a4079

// ✅ Componente para proteger rutas privadas
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
        <Route path="/reset-password/:uidb64/:token" element={<ResetPasswordPage />} />
        <Route path="/landing" element={<LandingPageScroll />} />

        {/* Rutas protegidas (requieren login) */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Ruta no encontrada */}
        <Route path="*" element={<NotFoundPagePlaceholder />} />
      </Routes>
    </Router>
  );
}

export default App;