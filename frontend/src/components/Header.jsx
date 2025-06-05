// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Para el logo si es un enlace a la home/dashboard

// Asume que crearás 'Header.module.css' o 'Header.css' e importarás los estilos
// import styles from './Header.module.css'; // Si usas CSS Modules
// import './Header.css'; // Si usas CSS global

// Placeholder para íconos (podrías usar SVGs o una librería más adelante)
const UserIconPlaceholder = () => <span className="header-icon"></span>;
const BellIconPlaceholder = () => <span className="header-icon"></span>;

const Header = ({ pageTitle = "SmartTime" }) => {
  // Nombres de clase que definirás en tu archivo CSS para Header
  const headerContainerClasses = "app-header-container";
  const leftSectionClasses = "app-header-left";
  const logoLinkClasses = "app-header-logo-link";
  const logoTextClasses = "app-header-logo-text"; // Para "SmartTime"
  // const logoIconClasses = "app-header-logo-icon"; // Si tienes un ícono SVG
  const pageTitleClasses = "app-header-page-title";
  const rightSectionClasses = "app-header-right";
  const iconButtonClasses = "app-header-icon-button";
  const userMenuClasses = "app-header-user-menu"; // Contenedor para el ícono de usuario/dropdown

  return (
    <header className={headerContainerClasses}>
      <div className={leftSectionClasses}>
        <Link to="/dashboard" className={logoLinkClasses}>
          {/* <img src={logoUrl} alt="SmartTime Logo" className={logoIconClasses} /> */}
          <span className={logoTextClasses}>SmartTime</span>
        </Link>
        {pageTitle && <h1 className={pageTitleClasses}>{pageTitle}</h1>}
      </div>

      <div className={rightSectionClasses}>
        <button type="button" className={iconButtonClasses} aria-label="Notifications">
          <BellIconPlaceholder />
        </button>
        <div className={userMenuClasses}>
          <button type="button" className={iconButtonClasses} aria-label="User menu">
            <UserIconPlaceholder />
            {/* Aquí podría ir un nombre de usuario o un dropdown más complejo */}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;