
// src/components/Header.jsx
import React from 'react';
import PropTypes from 'prop-types';
// Podríamos necesitar Link de react-router-dom si el logo es un enlace a la home
// import { Link } from 'react-router-dom';

// Iconos (ejemplo con Heroicons, puedes usar SVGs directamente o tu librería preferida)
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'; // Usamos outline para un look más limpio

const Header = ({ pageTitle }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Sección Izquierda: Logo y Título de Página */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              {/* <Link to="/" className="flex items-center text-xl font-bold text-indigo-600 dark:text-indigo-400"> */}
              <a href="/" className="flex items-center text-xl font-bold text-indigo-600 dark:text-indigo-400"> {/* Usamos <a> por simplicidad, Link si es SPA */}
                {/* Aquí podrías poner un SVG del logo si lo tienes */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                SmartTime
              {/* </Link> */}
              </a>
            </div>

            {/* Título de la Página (Opcional) */}
            {pageTitle && (
              <div className="hidden md:block ml-6">
                <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{pageTitle}</h1>
              </div>
            )}
          </div>

          {/* Sección Derecha: Iconos de Usuario/Notificaciones */}
          <div className="flex items-center">
            <button
              type="button"
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-700 focus:ring-indigo-500"
              aria-label="View notifications"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Menú de Usuario (simplificado por ahora, podría ser un Dropdown) */}
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="max-w-xs bg-white dark:bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-700 focus:ring-indigo-500"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  {/* Puedes usar una imagen de perfil real aquí si está disponible */}
                  <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              {/*
                Dropdown menu, show/hide based on menu state.
                Aquí iría la lógica para un menú desplegable (Perfil, Configuración, Cerrar Sesión)
                Por ahora, lo dejamos como un simple icono.
              */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  pageTitle: PropTypes.string, // El título de la página es opcional
};

Header.defaultProps = {
  pageTitle: null,
};

export default Header;