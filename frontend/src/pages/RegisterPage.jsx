// src/pages/RegisterPage/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Asume que crearás 'RegisterPage.module.css' o 'RegisterPage.css' e importarás los estilos
// import styles from './RegisterPage.module.css'; // Si usas CSS Modules
// import './RegisterPage.css'; // Si usas CSS global para esta página

import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

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

  // Nombres de clase que definirás en tu archivo CSS para RegisterPage
  const pageContainerClasses = "register-page-container";
  const formCardClasses = "register-form-card";
  const appNameClasses = "register-app-name"; // Para "SmartTime"
  const pageTitleClasses = "register-page-title"; // Para "Regístrate"
  const formClasses = "register-form";
  const submitButtonClasses = "register-submit-button";
  const loginPromptClasses = "register-login-prompt";
  const linkClasses = "register-link";


  return (
    <div className={pageContainerClasses}>
      <Card title="SmartTime" className={formCardClasses} titleClassName={appNameClasses}> {/* Pasando titleClassName */}
        <h2 className={pageTitleClasses}>Regístrate</h2>

        <form onSubmit={handleRegister} className={formClasses}>
          <Input
            label="Nombre"
            type="text"
            name="name"
            placeholder="Ingresa tu nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Usuario"
            type="text"
            name="username"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Fecha de nacimiento"
            type="text"
            name="birthDate"
            placeholder="dd/mm/aaaa"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
          <Input
            label="Carrera"
            type="text"
            name="career"
            placeholder="Ingresa tu carrera"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="Crea una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
  );
};

export default RegisterPage;