
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import UserIconPlaceholder from '../assets/Icons/user-profile.svg'; 
import BellIconPlaceholder from '../assets/Icons/notification-bell.svg';
import '../styles/Header.css'
const Header = ({ pageTitle = "Enfocado en Mejorar" }) => {
  const navigate = useNavigate(); 


  const headerContainerClasses = "app-header-container";
  const leftSectionClasses = "app-header-left";
  const logoLinkClasses = "app-header-logo-link";
  const logoTextClasses = "app-header-logo-text";
  const pageTitleClasses = "app-header-page-title";
  const rightSectionClasses = "app-header-right";
  const iconButtonClasses = "app-header-icon-button";
  const userMenuClasses = "app-header-user-menu"; 

  const handleUserProfileClick = () => {
    navigate('/settings'); 
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
            onClick={handleUserProfileClick} 
          >
            <img src={UserIconPlaceholder} alt="Usuario" />
          </button>
          {/*  */}
        </div>
      </div>
    </header>
  );
};

export default Header;