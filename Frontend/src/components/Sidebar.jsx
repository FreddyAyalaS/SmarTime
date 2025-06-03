// src/components/Sidebar.js
// Remove: import React, { useState } from 'react';
import React from 'react'; // useState is no longer needed here
import '../styles/Sidebar.css';

import appLogo from '../assets/Logo.png';
import homeIcon from '../assets/icons/home.svg';
import calendarIcon from '../assets/icons/calendar.svg';
import tasksIcon from '../assets/icons/tasks.svg';
import antiProcrastinationIcon from '../assets/icons/anti-procrastination.svg';
import statsIcon from '../assets/icons/stats.svg';
import settingsIcon from '../assets/icons/settings.svg';
import logoutIcon from '../assets/icons/logout.svg';

const navItems = [
    { id: 'dashboard', text: 'Dashboard', icon: homeIcon, href: '#' },
    { id: 'calendario', text: 'Calendario', icon: calendarIcon, href: '#' },
    { id: 'tareas', text: 'Tareas', icon: tasksIcon, href: '#' },
    { id: 'modo', text: 'Modo Antiprocrastinación', icon: antiProcrastinationIcon, href: '#' },
    { id: 'estadistica', text: 'Estadística', icon: statsIcon, href: '#' },
    { id: 'configuracion', text: 'Configuración', icon: settingsIcon, href: '#' },
];

// Accept activeItemId and onNavItemClick from props
function Sidebar({ activeItemId, onNavItemClick }) {

    const handleLogout = () => {
        console.log("Cerrar Sesión");
        // Potentially call onNavItemClick('login') or similar
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <img src={appLogo} alt="SmarTime Logo" className="sidebar-logo" />
                <h1 className="sidebar-title">SmarTime</h1>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={item.href}
                                className={`nav-item ${activeItemId === item.id ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent default link behavior
                                    onNavItemClick(item.id); // Call handler from App.js
                                }}
                            >
                                <img src={item.icon} alt="" className="nav-icon" />
                                <span>{item.text}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button onClick={handleLogout} className="logout-button nav-item">
                    <img src={logoutIcon} alt="" className="nav-icon" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;