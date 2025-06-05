import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import '../styles/RegisterPage.css'; 

import AppLogoIcon from '../assets/Icons/Logo.png'; 

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [career, setCareer] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Datos de registro:', { name, username, email, birthDate, career, password });
    alert('Registro simulado exitoso!');
    navigate('/login');
  };

  // css clases
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


  return (
    <div className={pageContainerClasses}>
      <div className={formSectionClasses}>
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
            <Button type="submit" variant="primary" fullWidth className={submitButtonClasses}>
              Registrarse
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
      <div className={imageSectionClasses}></div> {/* Sección para la imagen de fondo */}
    </div>
  );
};

export default RegisterPage;