// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate, useLocation } from 'react-router-dom';
import './App.css'; // Importamos App.css directamente
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// ... (otros placeholders usando clases globales como "page-placeholder")
const DashboardPagePlaceholder = () => <div className="page-placeholder"><h1>Dashboard </h1></div>;
const NotFoundPagePlaceholder = () => <div className="page-placeholder"><h1>404 - Página no encontrada</h1><Link to="/">Volver al inicio</Link></div>;
// --- Fin Placeholder Pages ---

const isAuthenticated = () => true;

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const MainAppLayout = () => {
  return (
    <div className="app-layout"> {/* Clase global */}
      
      <div className="sidebar-placeholder"> {<Sidebar /> }</div> {/* Clase global */}
      <div className="main-content-wrapper"> {/* Clase global */}
        
        <div className="header-placeholder"> { <Header /> }</div> {/* Clase global */}
        <main className="page-outlet"> {/* Clase global */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute><MainAppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPagePlaceholder />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="*" element={<NotFoundPagePlaceholder />} />
      </Routes>
    </Router>
  );
}

export default App;