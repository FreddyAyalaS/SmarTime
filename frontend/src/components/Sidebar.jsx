
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 

import '../styles/Sidebar.css'; 
import homeIcon from '../assets/Icons/home.svg';
import calendarIcon from '../assets/Icons/calendar.svg';
import logoutIcon from '../assets/Icons/logout.svg'; 
import settingsIcon from '../assets/Icons/settings.svg';
import statsIcon from '../assets/Icons/stats.svg';
import tasksIcon from '../assets/Icons/tasks.svg';
import antiProcrastinationIcon from '../assets/Icons/anti-procrastination.svg';

import AppLogo from '../assets/Icons/Logo.png'; 

const navItemsData = [ 
  { id: 'dashboard', text: 'Dashboard', icon: homeIcon, path: '/dashboard' },
  { id: 'calendario', text: 'Calendario', icon: calendarIcon, path: '/calendar' },
  { id: 'tareas', text: 'Tareas', icon: tasksIcon, path: '/tasks' },
  { id: 'modo', text: 'Modo Antiprocrastinación', icon: antiProcrastinationIcon, path: '/anti-procrastination' },
  { id: 'estadistica', text: 'Estadística', icon: statsIcon, path: '/analytics' },
  { id: 'configuracion', text: 'Configuración', icon: settingsIcon, path: '/settings' },
];


const sidebarContainerClasses = "app-sidebar-container";
const logoSectionClasses = "app-sidebar-logo-section";
const logoImageClasses = "app-sidebar-logo-image"; 
const logoTextClasses = "app-sidebar-logo-text";
const navClasses = "app-sidebar-nav";
const navItemClasses = "app-sidebar-nav-item";
const navItemActiveClasses = "app-sidebar-nav-item-active";
const navItemIconClasses = "app-sidebar-nav-item-icon";
const navItemTextClasses = "app-sidebar-nav-item-text";
const footerSectionClasses = "app-sidebar-footer"; 

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    navigate('/login'); // Redirige a la página de login
  };

 
  const allNavItems = [
    ...navItemsData,
    { id: 'logout', text: 'Cerrar Sesión', icon: logoutIcon, action: handleLogout, isLogout: true }
  ];

  return (
    <aside className={sidebarContainerClasses}>
      <div className={logoSectionClasses}>
        {<img src={AppLogo} alt="SmartTime Logo" className={logoImageClasses} /> }
        <span className={logoTextClasses}>SmartTime</span>
      </div>

      <nav className={navClasses}>
        {allNavItems.map((item) => {
          const isActive = !item.isLogout && (location.pathname === item.path || (item.path && item.path !== "/" && location.pathname.startsWith(item.path)));

          if (item.isLogout) {
            return (
              <div 
                key={item.id}
                className={`${navItemClasses} ${footerSectionClasses}`} 
                onClick={item.action}
              >
                <img src={item.icon} alt={`${item.text} icon`} className={navItemIconClasses} />
                <span className={navItemTextClasses}>{item.text}</span>
              </div>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`${navItemClasses} ${isActive ? navItemActiveClasses : ''}`}
            >
              <img src={item.icon} alt={`${item.text} icon`} className={navItemIconClasses} />
              <span className={navItemTextClasses}>{item.text}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;