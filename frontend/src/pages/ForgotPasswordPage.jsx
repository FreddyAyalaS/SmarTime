// src/pages/ForgotPasswordPage/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import '../styles/ForgotPasswordPage.css'
// Importa tus componentes reutilizables
import Input from '../components/Input'; // Ajusta la ruta si es necesario
import Button from '../components/Button';
import Card from '../components/Card';

// Asume que tienes un logo en src/assets/ si lo usas como imagen
// import AppLogo from '../../assets/logo-smart-time.svg';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  // const [message, setMessage] = useState(''); // Para mostrar mensajes de éxito o error

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar la solicitud de restablecimiento de contraseña
    console.log('Solicitud de restablecimiento para:', email);
    // En un proyecto real, llamarías a un servicio:
    // try {
    //   await authService.requestPasswordReset(email);
    //   setMessage('Si existe una cuenta con este correo, recibirás un enlace para restablecer tu contraseña.');
    // } catch (error) {
    //   setMessage('Hubo un error al procesar tu solicitud. Inténtalo de nuevo.');
    // }
    alert('Si existe una cuenta con este correo, recibirás un enlace para restablecer tu contraseña. (Simulación)');
    // Opcionalmente, podrías redirigir o simplemente mostrar el mensaje.
    // navigate('/login'); // Quizás no redirigir inmediatamente, solo mostrar mensaje.
  };

  // Nombres de clase que definirás en tu archivo CSS
  const pageContainerClasses = "forgot-password-page-container";
  const formCardClasses = "forgot-password-form-card";
  const appNameClasses = "forgot-password-app-name";
  const pageTitleClasses = "forgot-password-page-title";
  const formClasses = "forgot-password-form";
  const submitButtonClasses = "forgot-password-submit-button";
  const backToLoginLinkClasses = "forgot-password-back-link";
  // const messageClasses = "forgot-password-message"; // Para mostrar mensajes de éxito/error

  return (
    <div className={pageContainerClasses}>
      <Card title="SmartTime" className={formCardClasses} titleClassName={appNameClasses}>
        <h2 className={pageTitleClasses}>¿Olvidaste tu Contraseña?</h2>
        <p className="forgot-password-instructions">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {/* {message && <p className={messageClasses}>{message}</p>} */}

        <form onSubmit={handleSubmit} className={formClasses}>
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="tuemail@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            // className="forgot-password-input-group" // Clases adicionales si es necesario
          />
          <Button type="submit" variant="primary" fullWidth className={submitButtonClasses}>
            Enviar Enlace de Restablecimiento
          </Button>
        </form>

        <div className={backToLoginLinkClasses}>
          <Link to="/login" className="link-styled"> {/* Usa una clase genérica para enlaces o una específica */}
            Volver a Iniciar Sesión
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;