// src/pages/ResetPasswordPage/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import '../styles/ResetPasswordPage.css';

import { resetPasswordWithToken } from '../services/authService';

const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (!resetToken) {
      setError('Token de restablecimiento no encontrado. Por favor, usa el enlace de tu correo.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await resetPasswordWithToken(resetToken, newPassword);
      setSuccessMessage(response.message || '¡Contraseña restablecida con éxito! Ya puedes iniciar sesión.');
      alert('¡Contraseña restablecida!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error al restablecer la contraseña. El enlace podría haber expirado.');
    } finally {
      setIsLoading(false);
    }
  };

  const pageContainerClasses = "reset-password-page-container";
  const formCardClasses = "reset-password-form-card";
  const appNameClasses = "reset-password-app-name";
  const pageTitleClasses = "reset-password-page-title";
  const formClasses = "reset-password-form";
  const submitButtonClasses = "reset-password-submit-button";
  const loginLinkContainerClasses = "reset-password-login-link-container";
  const errorMessageClasses = "reset-password-error-message";
  const successMessageClasses = "reset-password-success-message";

  return (
    <div className={pageContainerClasses}>
      <Card title="SmartTime" className={formCardClasses} titleClassName={appNameClasses}>
        <h2 className={pageTitleClasses}>Establecer Nueva Contraseña</h2>

        <form onSubmit={handleSubmit} className={formClasses}>
          <Input
            label="Nueva Contraseña"
            type="password"
            name="newPassword"
            placeholder="Ingresa tu nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            label="Confirmar Nueva Contraseña"
            type="password"
            name="confirmPassword"
            placeholder="Confirma tu nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className={errorMessageClasses}>{error}</p>}
          {successMessage && <p className={successMessageClasses}>{successMessage}</p>}

          <Button type="submit" variant="primary" fullWidth className={submitButtonClasses} disabled={isLoading || !!successMessage}>
            {isLoading ? 'Estableciendo...' : 'Restablecer Contraseña'}
          </Button>
        </form>

        {successMessage && (
          <div className={loginLinkContainerClasses}>
            <Link to="/login" className="link-styled">
              Ir a Iniciar Sesión
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
