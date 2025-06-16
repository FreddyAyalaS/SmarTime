// src/pages/RegisterPage/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../components/Input'; // Ajusta la ruta si es necesario
import Button from '../components/Button';
import Card from '../components/Card';
import '../styles/RegisterPage.css'; // O tu ruta correcta
import AppLogoIcon from '../assets/Icons/Logo.png';

// --- ADICIÓN 1: Importar el servicio ---
import { registerUser } from '../services/authService'; // Ajusta la ruta si es necesario

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [career, setCareer] = useState('');
  const [password, setPassword] = useState('');
  // --- ADICIÓN 2: Nuevos estados para carga, error y éxito ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // --- ADICIÓN 3: Modificar handleRegister para ser async y llamar al servicio ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const userData = { name, username, email, birthDate, career, password };

    try {
      const response = await registerUser(userData);
      console.log('Registro exitoso desde el componente:', response);
      setSuccessMessage(response.message || '¡Registro exitoso! Serás redirigido.');
      // alert('¡Registro exitoso! (Simulación con servicio)'); // Puedes quitar el alert si muestras el successMessage

      // Opcional: Limpiar el formulario después de un registro exitoso
      // setName(''); setUsername(''); setEmail(''); setBirthDate(''); setCareer(''); setPassword('');

      setTimeout(() => {
        navigate('/login'); // Redirigir después de un breve momento para ver el mensaje
      }, 2000); // Ajusta el tiempo según prefieras
    } catch (err) {
      console.error('Error en handleRegister (componente):', err.message);
      setError(err.message || 'Error durante el registro. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Tus clases CSS (sin cambios)
  const pageContainerClasses = "register-page-container";
  const formSectionClasses = "register-form-section";
  const logoHeaderContainerClasses = "register-logo-header-container";
  const logoImageClasses = "register-logo-image";
  const appNameTextClasses = "register-app-name-text";
  const formCardClasses = "register-form-card";
  const pageTitleClasses = "register-page-title";
  const formClasses = "register-form";
  const submitButtonClasses = "register-submit-button";
  const loginPromptClasses = "register-login-prompt";
  const linkClasses = "register-link";
  const imageSectionClasses = "register-image-section";

  // --- ADICIÓN 4: Nombres de clase para los mensajes ---
  const errorMessageClasses = "register-form-error-message";
  const successMessageClasses = "register-form-success-message";

  return (
    <div className={pageContainerClasses}>
      <div className={formSectionClasses}>
        {/* Tu estructura para el logo, asumimos que está dentro del Card o como lo tenías */}
        <Card className={formCardClasses}>
          <div className={logoHeaderContainerClasses}>
            <img src={AppLogoIcon} alt="SmartTime Logo Icono" className={logoImageClasses} />
            <span className={appNameTextClasses}>SmartTime</span>
          </div>
          <h2 className={pageTitleClasses}>Regístrate</h2>

          <form onSubmit={handleRegister} className={formClasses}>
            <Input
              label="Nombre" type="text" name="name" placeholder="Ingresa tu nombre completo"
              value={name} onChange={(e) => setName(e.target.value)} required
            />
            <Input
              label="Usuario" type="text" name="username" placeholder="Ingresa tu usuario"
              value={username} onChange={(e) => setUsername(e.target.value)} required
            />
            <Input
              label="Email" type="email" name="email" placeholder="Ingresa tu email"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
            <Input
              label="Fecha de nacimiento" type="text" name="birthDate" placeholder="dd/mm/aaaa"
              value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required
            />
            <Input
              label="Carrera" type="text" name="career" placeholder="Ingresa tu carrera"
              value={career} onChange={(e) => setCareer(e.target.value)} required
            />
            <Input
              label="Contraseña" type="password" name="password" placeholder="Crea una contraseña"
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />

            {/* --- ADICIÓN 5: Mostrar mensajes de error y éxito --- */}
            {error && <p className={errorMessageClasses}>{error}</p>}
            {successMessage && <p className={successMessageClasses}>{successMessage}</p>}

            {/* --- ADICIÓN 6: Modificar el botón para estado de carga --- */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              className={submitButtonClasses}
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </Button>
          </form>

          <p className={loginPromptClasses}>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className={linkClasses}>
              Inicia sesión
            </Link>
          </p>
        </Card>
      </div>
      <div className={imageSectionClasses}></div>
    </div>
  );
};

export default RegisterPage;