// src/components/Header/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import UserIconPlaceholder from '../assets/Icons/user-profile.svg'; // Asegúrate que las rutas sean correctas
import BellIconPlaceholder from '../assets/Icons/notification-bell.svg';
// import './Header.css'; // O './Header.module.css' si lo tienes ahí
import '../styles/Header.css'
const Header = ({ pageTitle = "Enfocado en Mejorar" }) => {
  const navigate = useNavigate(); // Hook para la navegación programática

  // Nombres de clase (como los tenías)
  const headerContainerClasses = "app-header-container";
  const leftSectionClasses = "app-header-left";
  const logoLinkClasses = "app-header-logo-link";
  const logoTextClasses = "app-header-logo-text";
  const pageTitleClasses = "app-header-page-title";
  const rightSectionClasses = "app-header-right";
  const iconButtonClasses = "app-header-icon-button";
  const userMenuClasses = "app-header-user-menu"; // Este es el div que envuelve el botón de usuario

  const handleUserProfileClick = () => {
    navigate('/settings'); // Redirige a la página de configuración
  };

  return (
    <header className={headerContainerClasses}>
      <div className={leftSectionClasses}>
        <Link to="/dashboard" className={logoLinkClasses}>
          <span className={logoTextClasses}>SmartTime</span>
        </Link>
        {pageTitle && <h1 className={pageTitleClasses}>{pageTitle}</h1>}
      </div>

      <div className={rightSectionClasses}>
        <button type="button" className={iconButtonClasses} aria-label="Notificaciones">
          <img src={BellIconPlaceholder} alt="Notificaciones" />
        </button>
        <div className={userMenuClasses}>
          <button
            type="button"
            className={iconButtonClasses}
            aria-label="Menú de usuario"
            onClick={handleUserProfileClick} // <--- AÑADE EL MANEJADOR DE CLIC AQUÍ
          >
            <img src={UserIconPlaceholder} alt="Usuario" />
          </button>
          {/* Aquí es donde podrías tener un menú desplegable en el futuro.
              Por ahora, todo el botón del ícono de usuario redirige. */}
        </div>
      </div>
    </header>
  );
};

export default Header;