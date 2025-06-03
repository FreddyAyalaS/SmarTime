// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import LoginPage from './pages/LoginPage';       // Import LoginPage
import RegisterPage from './pages/RegisterPage'; // Import RegisterPage
import './App.css';

// Map sidebar item IDs to their corresponding titles
const pageTitles = {
    dashboard: 'Bienvenido a SmarTime',
    calendario: 'Calendario',
    tareas: 'Tareas',
    modo: 'Modo Antiprocrastinación',
    estadistica: 'Estadística',
    configuracion: 'Configuración',
};

// A wrapper component for the main authenticated layout
function MainAppLayout() {
    const [activePageId, setActivePageId] = useState('dashboard');
    const navigate = useNavigate(); // For programmatic navigation

    const handleNavItemClick = (pageId) => {
        setActivePageId(pageId);
        // Optionally, navigate to a corresponding route if your sidebar items are routes
        // For now, it just changes the title
    };

    const handleLogout = () => {
        // Perform logout logic (e.g., clear token, call API)
        localStorage.removeItem('userToken'); // Example: remove token
        navigate('/login'); // Redirect to login after logout
    };

    const currentTitle = pageTitles[activePageId] || 'SmarTime';

    // useEffect(() => {
    //     // This could be used to sync activePageId with the current route
    //     // if you use a more route-based navigation for the sidebar items.
    //     // For example, if location.pathname is '/dashboard', set activePageId to 'dashboard'.
    // }, [location]);


    return (
        <div className="app-container-vertical"> {/* Using the vertical layout from previous examples */}
            <TopHeader title={currentTitle} /> {/* You might want to pass user info or logout to TopHeader */}
            <div className="app-body-container">
                <Sidebar
                    activeItemId={activePageId}
                    onNavItemClick={handleNavItemClick}
                    onLogout={handleLogout} // Pass logout handler to Sidebar
                />
                <main className="main-content">
                    <h2>Page: {currentTitle}</h2>
                    <p>Content for the selected page will appear here.</p>
                    {/* Here you would render different components based on activePageId or route */}
                    {/* e.g., if (activePageId === 'dashboard') return <DashboardComponent />; */}
                </main>
            </div>
        </div>
    );
}


function App() {
    // Simulate authentication state
    // In a real app, you'd check localStorage for a token, context, or Redux store
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userToken'));

    // This function would be called by LoginPage upon successful login
    const handleLoginSuccess = () => {
        localStorage.setItem('userToken', 'your_auth_token'); // Example: store a token
        setIsAuthenticated(true);
    };
    
    // This function would be passed to the main app to handle logout
    // Or, handleLogout can be directly within MainAppLayout and just update isAuthenticated here.
    // For simplicity, we'll let MainAppLayout handle its navigation and token clearing.
    // This effect will listen to localStorage changes to keep isAuthenticated in sync
    // if logout happens in a different component that modifies localStorage.
    useEffect(() => {
        const checkAuth = () => setIsAuthenticated(!!localStorage.getItem('userToken'));
        window.addEventListener('storage', checkAuth); // Listen for changes from other tabs/windows
        
        // Initial check (e.g. if user was already logged in from previous session)
        checkAuth();

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);


    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        !isAuthenticated ? (
                            <LoginPage onLoginSuccess={handleLoginSuccess} />
                        ) : (
                            <Navigate to="/dashboard" replace /> // Redirect to dashboard if already logged in
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        !isAuthenticated ? (
                            <RegisterPage />
                        ) : (
                            <Navigate to="/dashboard" replace /> // Redirect if already logged in
                        )
                    }
                />
                
                {/* Protected Route for the main application */}
                <Route
                    path="/*" // Matches /dashboard, /calendario, etc.
                    element={
                        isAuthenticated ? (
                            <MainAppLayout />
                        ) : (
                            <Navigate to="/login" replace /> // Redirect to login if not authenticated
                        )
                    }
                />
                {/* You could define more specific routes for the main app here if needed:
                <Route path="/dashboard" element={isAuthenticated ? <MainAppLayout initialPage="dashboard" /> : <Navigate to="/login" />} />
                <Route path="/calendario" element={isAuthenticated ? <MainAppLayout initialPage="calendario" /> : <Navigate to="/login" />} />
                ... and so on
                Then MainAppLayout would use initialPage to set its activePageId.
                For now, "/*" keeps it simple and MainAppLayout defaults to 'dashboard'.
                */}
            </Routes>
        </Router>
    );
}

export default App;