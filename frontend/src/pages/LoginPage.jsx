// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Asume que crearás 'LoginPage.module.css' o 'LoginPage.css' e importarás los estilos
// import styles from './LoginPage.module.css'; // Si usas CSS Modules
// import './LoginPage.css'; // Si usas CSS global para esta página

// Importa tus componentes
import Input from '../components/Input'; // Ajusta la ruta si es necesario
import Button from '../components/Button';
import Card from '../components/Card';

// Asume que tienes un logo en src/assets/ si lo usas como imagen
// import AppLogo from '../../assets/logo-smart-time.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login con:', { email, password });
    navigate('/dashboard'); // Simulación
  };

  // Nombres de clase que definirás en tu archivo CSS para LoginPage
  const pageContainerClasses = "login-page-container";
  const formCardClasses = "login-form-card"; // Puedes pasar esta como className a Card si es necesario
  const logoContainerClasses = "login-logo-container";
  const appNameClasses = "login-app-name"; // Para el texto "SmartTime"
  const pageTitleClasses = "login-page-title"; // Para "Iniciar Sesión"
  const googleButtonClasses = "login-google-button"; // Clase adicional para el botón de Google si es necesario
  const dividerContainerClasses = "login-divider-container";
  const dividerLineClasses = "login-divider-line";
  const dividerTextClasses = "login-divider-text";
  const formClasses = "login-form";
  const forgotPasswordClasses = "login-forgot-password";
  const linkClasses = "login-link"; // Para enlaces genéricos dentro de la página de login
  const submitButtonClasses = "login-submit-button"; // Clase adicional para el botón de login si es necesario
  const signupPromptClasses = "login-signup-prompt";


  return (
    <div className={pageContainerClasses}>
      <Card title="SmartTime" className={formCardClasses} titleClassName={appNameClasses}> {/* Pasando titleClassName */}
        <h2 className={pageTitleClasses}>Iniciar Sesión</h2>

        <Button variant="google" fullWidth className={googleButtonClasses}>
          {/* Si tienes un ícono SVG para Google:
          <svg className="google-icon" ...></svg>
          */}
          Continuar con Google
        </Button>

        <div className={dividerContainerClasses}>
          <hr className={dividerLineClasses} />
          <span className={dividerTextClasses}>O con su cuenta</span>
          <hr className={dividerLineClasses} />
        </div>

        <form onSubmit={handleLogin} className={formClasses}>
          <Input
            label="Correo"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            // Puedes pasar classNames a Input si su CSS lo permite
            // className="login-input-group"
            // labelClassName="login-input-label"
            // inputClassName="login-input-field"
          />
          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={forgotPasswordClasses}>
            <Link to="/forgot-password" className={linkClasses}>
              ¿Olvidó su contraseña?
            </Link>
          </div>
          <Button type="submit" variant="primary" fullWidth className={submitButtonClasses}>
            Iniciar Sesión
          </Button>
        </form>

        <p className={signupPromptClasses}>
          ¿Aún no eres miembro?{' '}
          <Link to="/register" className={linkClasses}>
            Regístrate
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;