// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../components/Input'; // Ajusta la ruta si es necesario
import Button from '../components/Button';
import Card from '../components/Card';
import '../styles/LoginPage.css'; // O tu ruta correcta
import AppLogo from '../assets/Icons/Logo.png';

// --- ADICIÓN 1: Importar el servicio ---
import { loginUser } from '../services/authService'; // Ajusta la ruta si es necesario
// import { useAuth } from '../../context/AuthContext'; // Descomenta cuando tengas AuthContext


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // --- ADICIÓN 2: Nuevos estados para carga y error ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // --- ADICIÓN 3: Modificar handleLogin para ser async y llamar al servicio ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const responseData = await loginUser({ email, password });
      console.log('Login con (servicio):', responseData); // Log de la respuesta del servicio

      // Aquí iría la lógica real después de un login exitoso con backend
      if (responseData.token && responseData.user) {
        localStorage.setItem('authToken', responseData.token); // Ejemplo de guardar token
        // Aquí llamarías a una acción de tu AuthContext si lo usas
        // authContext.login(responseData.user, responseData.token);
        alert('¡Inicio de sesión exitoso! (Simulación con servicio)'); // Feedback temporal
        navigate('/dashboard');
      } else {
        // Si la estructura de responseData no es la esperada pero no hubo error HTTP
        setError('Respuesta inesperada del servidor.');
      }
    } catch (err) {
      // El error 'err' es el que lanzaste desde authService.js
      console.error('Error en handleLogin (componente):', err.message);
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  // Tus clases CSS (sin cambios)
  const pageContainerClasses = "login-page-container";
  const formCardClasses = "login-form-card";
  const logoContainerClasses = "login-logo-container"; // Para el div que pasas a Card title
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
  const logoImageClasses = "login-logo-image"; // Para la <img> del logo

  // --- ADICIÓN 4: Nombre de clase para el mensaje de error ---
  const errorMessageClasses = "login-form-error-message";


  return (
    <div className={pageContainerClasses}>
      {/* MANTENEMOS TU ESTRUCTURA JSX PARA EL FORMULARIO Y LA IMAGEN DE FONDO */}
      <div className="login-form-section"> {/* Asumo que esta clase la tienes definida */}
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

            {/* --- ADICIÓN 5: Mostrar el mensaje de error --- */}
            {error && <p className={errorMessageClasses}>{error}</p>}

            <div className={forgotPasswordClasses}>
              <Link to="/forgot-password" className={linkClasses}>
                ¿Olvidó su contraseña?
              </Link>
            </div>
            {/* --- ADICIÓN 6: Modificar el botón para estado de carga --- */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              className={submitButtonClasses}
              disabled={isLoading} // Deshabilita el botón mientras carga
            >
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión'} {/* Texto dinámico */}
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
      <div className="login-image-section"></div> {/* Asumo que esta clase la tienes definida */}
    </div>
  );
};

export default LoginPage;