
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input'; 
import Button from '../components/Button';
import Card from '../components/Card';
import '../styles/LoginPage.css'
import AppLogo from '../assets/Icons/Logo.png';


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login con:', { email, password });
    navigate('/dashboard'); // Simulación
  };

  // css clases
  const pageContainerClasses = "login-page-container";
  const formCardClasses = "login-form-card"; 
  const logoContainerClasses = "login-logo-container";
  const appNameClasses = "login-app-name"; 
  const pageTitleClasses = "login-page-title"; 
  const googleButtonClasses = "login-google-button"; 
  const dividerContainerClasses = "login-divider-container";
  const dividerLineClasses = "login-divider-line";
  const dividerTextClasses = "login-divider-text";
  const formClasses = "login-form";
  const forgotPasswordClasses = "login-forgot-password";
  const linkClasses = "login-link"; 
  const submitButtonClasses = "login-submit-button"; 
  const signupPromptClasses = "login-signup-prompt";
  const logoImageClasses = "logo";


  return (
    <div className={pageContainerClasses}>
      <Card
        title={
          <div className={logoContainerClasses}>
            <img src={AppLogo} alt="SmartTime Logo" className={logoImageClasses} />
            <span className={appNameClasses}>SmartTime</span>
          </div>
        }
        className={formCardClasses}
      >
      <h2 className={pageTitleClasses}>Iniciar Sesión</h2>

      <Button variant="google" fullWidth className={googleButtonClasses}>
  
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
      {/* Sección de la imagen de fondo */ }
  <div className="login-image-section"></div>
    </div >
    
  );
};

export default LoginPage;