
import React from 'react';
import { Link, useLocation } from 'react-router-dom';


// Asume que crearás 'Sidebar.module.css' o 'Sidebar.css' e importarás los estilos
// import styles from './Sidebar.module.css'; // Si usas CSS Modules
// import './Sidebar.css'; // Si usas CSS global

// Placeholder para íconos de navegación
// Deberías reemplazarlos con SVGs o íconos de una librería más adelante
const DashboardIcon = () => <span></span>;
const CalendarIcon = () => <span></span>;
const TasksIcon = () => <span></span>;
const AnalyticsIcon = () => <span></span>;
const AntiProcrastinationIcon = () => <span></span>;
const SettingsIcon = () => <span></span>;


const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { name: 'Calendario', path: '/calendar', icon: CalendarIcon },
  { name: 'Tareas', path: '/tasks', icon: TasksIcon },
  { name: 'Analíticas', path: '/analytics', icon: AnalyticsIcon },
  { name: 'Modo Anti-Procrastinación', path: '/anti-procrastination', icon: AntiProcrastinationIcon },
  { name: 'Configuración', path: '/settings', icon: SettingsIcon },
];

const Sidebar = () => {
  const location = useLocation();

  // Nombres de clase que definirás en tu archivo CSS para Sidebar
  const sidebarContainerClasses = "app-sidebar-container";
  const logoSectionClasses = "app-sidebar-logo-section";
  const logoTextClasses = "app-sidebar-logo-text"; // "SmartTime" en el sidebar
  const navClasses = "app-sidebar-nav";
  const navItemClasses = "app-sidebar-nav-item";
  const navItemActiveClasses = "app-sidebar-nav-item-active"; // Para el ítem activo
  const navItemIconClasses = "app-sidebar-nav-item-icon";
  const navItemTextClasses = "app-sidebar-nav-item-text";
  const footerSectionClasses = "app-sidebar-footer";
  const logoutButtonClasses = "app-sidebar-logout-button";


  return (
    <aside className={sidebarContainerClasses}>
      <div className={logoSectionClasses}>
        {/* Podrías tener un logo más pequeño o solo texto aquí */}
        <span className={logoTextClasses}>SmartTime</span>
      </div>

      <nav className={navClasses}>
        {navItems.map((item) => {
          const Icon = item.icon;
          // Comprueba si la ruta actual comienza con la ruta del ítem para resaltarlo
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`${navItemClasses} ${isActive ? navItemActiveClasses : ''}`}
            >
              {Icon && <Icon className={navItemIconClasses} />}
              <span className={navItemTextClasses}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className={footerSectionClasses}>
        {/* Podrías tener info de usuario o un botón de cerrar sesión */}
        <button type="button" className={logoutButtonClasses}>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;