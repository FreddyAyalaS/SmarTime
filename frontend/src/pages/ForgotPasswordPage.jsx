// src/pages/ForgotPasswordPage/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/ForgotPasswordPage.css';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Solicitud de restablecimiento para:', email);
    alert('Si existe una cuenta con este correo, recibirás un enlace para restablecer tu contraseña. (Simulación)');
  };

  const pageContainerClasses = "forgot-password-page-container";
  const formCardClasses = "forgot-password-form-card";
  const appNameClasses = "forgot-password-app-name";
  const pageTitleClasses = "forgot-password-page-title";
  const formClasses = "forgot-password-form";
  const submitButtonClasses = "forgot-password-submit-button";
  const backToLoginLinkClasses = "forgot-password-back-link";

  return (
    <div className={pageContainerClasses}>
      <Card title="SmartTime" className={formCardClasses} titleClassName={appNameClasses}>
        <h2 className={pageTitleClasses}>¿Olvidaste tu Contraseña?</h2>
        <p className="forgot-password-instructions">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <form onSubmit={handleSubmit} className={formClasses}>
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="tuemail@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" fullWidth className={submitButtonClasses}>
            Enviar Enlace de Restablecimiento
          </Button>
        </form>

        <div className={backToLoginLinkClasses}>
          <Link to="/login" className="link-styled">
            Volver a Iniciar Sesión
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
