// src/pages/SettingsPage/SettingsPage.jsx
import React, { useState } from 'react';
// import styles from './SettingsPage.module.css'; // Si usas CSS Modules
// import './SettingsPage.css'; // Si usas CSS global para esta página

// Importa tus componentes reutilizables
import Input from '../components/Input'; // Ajusta la ruta si es necesario
import Button from '../components/Button';
// Podrías crear un componente ToggleSwitch si lo vas a reutilizar
// import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

// --- Sub-componente para la pestaña Editar Perfil ---
const EditProfileSection = () => {
  // Nombres de clase para esta sección
  const sectionClasses = "settings-edit-profile-section";
  const formContainerClasses = "settings-form-container";
  const profilePictureContainerClasses = "settings-profile-picture-container";
  const profilePictureClasses = "settings-profile-picture"; // Para la imagen/icono grande
  const changePhotoButtonClasses = "settings-change-photo-button";
  const formClasses = "settings-profile-form";
  const saveButtonContainerClasses = "settings-save-button-container";

  // Estado para los campos del formulario (inicializar con datos del usuario si los tienes)
  const [name, setName] = useState('Sebastian Santiago Ayala Alberca');
  const [username, setUsername] = useState('Draco');
  const [password, setPassword] = useState('****************'); // No mostrar la real, solo placeholder
  const [email, setEmail] = useState('sebastianayala1@unmsm.edu.pe');
  const [career, setCareer] = useState('Ing. de software');
  const [birthDate, setBirthDate] = useState('25 Diciembre 2004');

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log('Perfil guardado:', { name, username, /* no enviar password a menos que se cambie */ email, career, birthDate });
    alert('Perfil guardado (Simulación)');
  };

  return (
    <div className={sectionClasses}>
      <div className={formContainerClasses}>
        <form onSubmit={handleProfileSubmit} className={formClasses}>
          <Input label="Nombre real" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Nombre de Usuario" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input label="Contraseña" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nueva contraseña (opcional)" />
          <Input label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Carrera" name="career" value={career} onChange={(e) => setCareer(e.target.value)} />
          <Input label="Fecha de nacimiento" name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </form>
      </div>
      <div className={profilePictureContainerClasses}>
        {/* Placeholder para la imagen de perfil */}
        <div className={profilePictureClasses}>
          {/* Aquí iría un <img> o un ícono SVG grande */}
          <span style={{fontSize: '5rem'}}>👤</span> {/* Placeholder muy básico */}
        </div>
        <Button variant="secondary" className={changePhotoButtonClasses}>Cambiar foto</Button>
      </div>
      <div className={saveButtonContainerClasses}>
         <Button type="submit" variant="success" onClick={handleProfileSubmit}>Guardar</Button> {/* Asume variante 'success' para botón verde */}
      </div>
    </div>
  );
};

// --- Sub-componente para la pestaña Preferencias ---
// Placeholder para un componente ToggleSwitch
const ToggleSwitch = ({ label, checked, onChange, name }) => {
  const switchContainer = "settings-toggle-switch-container";
  const switchLabel = "settings-toggle-label";
  const switchInput = "settings-toggle-input"; // Hidden
  const switchSlider = "settings-toggle-slider";

  return (
    <div className={switchContainer}>
      <label htmlFor={name} className={switchLabel}>{label}</label>
      <label className="relative inline-flex items-center cursor-pointer"> {/* Clases de Tailwind si las tuvieras */}
        <input type="checkbox" id={name} name={name} checked={checked} onChange={onChange} className="sr-only peer" /> {/* sr-only para ocultar checkbox real */}
        <div className={`w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600 ${switchSlider}`}></div>
      </label>
    </div>
  );
};


const PreferencesSection = () => {
  const sectionClasses = "settings-preferences-section";
  const preferenceItemClasses = "settings-preference-item";
  const saveButtonContainerClasses = "settings-save-button-container"; // Reutilizamos clase

  const [antiProcrastination, setAntiProcrastination] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [suggestions, setSuggestions] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handlePreferencesSubmit = (e) => {
    // e.preventDefault(); // No es un form, el botón es el que guarda
    console.log('Preferencias guardadas:', { antiProcrastination, notifications, suggestions, darkMode });
    alert('Preferencias guardadas (Simulación)');
  };

  return (
    <div className={sectionClasses}>
      <div className={preferenceItemClasses}>
        <ToggleSwitch label="Activar Modo Anti-Procrastinación" name="antiProcrastination" checked={antiProcrastination} onChange={() => setAntiProcrastination(!antiProcrastination)} />
      </div>
      <div className={preferenceItemClasses}>
        <ToggleSwitch label="Activar Notificaciones" name="notifications" checked={notifications} onChange={() => setNotifications(!notifications)} />
      </div>
      <div className={preferenceItemClasses}>
        <ToggleSwitch label="Activar Sugerencias" name="suggestions" checked={suggestions} onChange={() => setSuggestions(!suggestions)} />
      </div>
      <div className={preferenceItemClasses}>
        <ToggleSwitch label="Activar Modo Oscuro" name="darkMode" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </div>
      <div className={saveButtonContainerClasses}>
         <Button variant="success" onClick={handlePreferencesSubmit}>Guardar</Button>
      </div>
    </div>
  );
};


// --- Componente Principal de la Página de Configuración ---
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' o 'preferences'

  // Nombres de clase para la página de Configuración
  const pageContainerClasses = "settings-page-container"; // Estilo general de la página
  const pageTitleClasses = "settings-page-title"; // Para "Configuración"
  const tabsContainerClasses = "settings-tabs-container";
  const tabButtonClasses = "settings-tab-button";
  const tabButtonActiveClasses = "settings-tab-button-active";
  const tabContentClasses = "settings-tab-content";

  return (
    <div className={pageContainerClasses}>
      {/* El título "Configuración" ya debería estar en el Header que es parte del Layout */}
      {/* Si necesitas un título adicional aquí, puedes añadirlo: */}
      {/* <h1 className={pageTitleClasses}>Configuración</h1> */}

      <div className={tabsContainerClasses}>
        <button
          className={`${tabButtonClasses} ${activeTab === 'profile' ? tabButtonActiveClasses : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Editar Perfil
        </button>
        <button
          className={`${tabButtonClasses} ${activeTab === 'preferences' ? tabButtonActiveClasses : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferencias
        </button>
      </div>

      <div className={tabContentClasses}>
        {activeTab === 'profile' && <EditProfileSection />}
        {activeTab === 'preferences' && <PreferencesSection />}
      </div>
    </div>
  );
};

export default SettingsPage;