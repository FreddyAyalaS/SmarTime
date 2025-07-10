import React, { useState, useEffect } from 'react';
import '../styles/SettingsPage.css';
import Input from '../components/Input';
import Button from '../components/Button';
import config from '../config';

const userService = config.USE_MOCK_USER_SERVICE
  ? require('../services/userService.mock')
  : require('../services/userService');

const {
  getUserProfile,
  updateUserProfile,
  updateProfilePicture,
  updateUserPreferences,
} = userService;

const EditProfileSection = () => {
  const sectionClasses = "settings-edit-profile-section";
  const formContainerClasses = "settings-form-container";
  const profilePictureContainerClasses = "settings-profile-picture-container";
  const profilePictureClasses = "settings-profile-picture";
  const changePhotoButtonClasses = "settings-change-photo-button";
  const formClasses = "settings-profile-form";
  const saveButtonContainerClasses = "settings-save-button-container";

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [career, setCareer] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getUserProfile()
      .then((data) => {
        setName(data.first_name || ''); // <-- Cambia a first_name
        setUsername(data.username || '');
        setEmail(data.email || '');
        setCareer(data.escuela_profesional || ''); // <-- Cambia a escuela_profesional
        setBirthDate(data.fecha_nacimiento || ''); // <-- Cambia a fecha_nacimiento
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = { name, username, email, career, birthDate };
      if (password && password !== '****************') {
        data.password = password;
      }
      await updateUserProfile(data);
      alert('Perfil guardado correctamente');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('profile_picture', file);
    setLoading(true);
    setError('');
    try {
      await updateProfilePicture(formData);
      alert('Foto de perfil actualizada');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={sectionClasses}>
      <div className={formContainerClasses}>
        <form onSubmit={handleProfileSubmit} className={formClasses}>
          <Input label="Nombre real:   " name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Nombre de Usuario:   " name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input label="Contraseña:   " name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nueva contraseña (opcional)" />
          <Input label="Email:   " name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Carrera:   " name="career" value={career} onChange={(e) => setCareer(e.target.value)} />
          <Input label="Fecha de nacimiento:   " name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </form>
      </div>
      <div className={profilePictureContainerClasses}>
        <div className={profilePictureClasses}>
          <span style={{ fontSize: '5rem' }}>👤</span>
        </div>
        <Button
          variant="secondary"
          className={changePhotoButtonClasses}
          onClick={() => document.getElementById('profile-photo-input').click()}
        >
          Cambiar foto
        </Button>
        <input
          id="profile-photo-input"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handlePhotoChange}
        />
      </div>
      <div className={saveButtonContainerClasses}>
        <Button type="submit" variant="success" onClick={handleProfileSubmit}>Guardar</Button>
      </div>
    </div>
  );
};

const ToggleSwitch = ({ label, checked, onChange, name }) => {
  const switchContainer = "settings-toggle-switch-container";
  const switchLabel = "settings-toggle-label";
  return (
    <div className={switchContainer}>
      <label htmlFor={name} className={switchLabel}>{label}</label>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" id={name} name={name} checked={checked} onChange={onChange} className="sr-only peer" />
      </label>
    </div>
  );
};

const PreferencesSection = () => {
  const sectionClasses = "settings-preferences-section";
  const preferenceItemClasses = "settings-preference-item";
  const saveButtonContainerClasses = "settings-save-button-container";

  const [antiProcrastination, setAntiProcrastination] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [suggestions, setSuggestions] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePreferencesSubmit = async (e) => {
    setLoading(true);
    setError('');
    try {
      await updateUserPreferences({ antiProcrastination, notifications, suggestions, darkMode });
      alert('Preferencias guardadas correctamente');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const pageContainerClasses = "settings-page-container";
  const pageTitleClasses = "settings-page-title";
  const tabsContainerClasses = "settings-tabs-container";
  const tabButtonClasses = "settings-tab-button";
  const tabButtonActiveClasses = "settings-tab-button-active";
  const tabContentClasses = "settings-tab-content";

  return (
    <div className={pageContainerClasses}>
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
