// src/components/LoginPage.js
import React, { useState } from 'react';
import '../styles/AuthPage.css'; // Shared styles
import appLogo from '../assets/Logo.png';
import authBgImage from '../assets/icons/auth-background.png'; // Your background image
import googleIcon from '../assets/icons/google-icon.svg';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', formData);
        // Add actual login logic here
    };

    const handleGoogleLogin = () => {
        console.log('Login with Google');
        // Add Google login logic
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <header className="auth-header">
                    <img src={appLogo} alt="SmarTime Logo" className="auth-logo" />
                    <h1 className="auth-brand-title">SmarTime</h1>
                </header>
                <div className="form-wrapper">
                    <h2>Iniciar Sesión</h2>
                    <button className="google-button" onClick={handleGoogleLogin}>
                        <img src={googleIcon} alt="Google icon" />
                        Continuar con Google
                    </button>
                    <div className="or-separator">O con su cuenta</div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Correo</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="" // Placeholder not visible in image
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="" // Placeholder not visible in image
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                             <a href="#" className="forgot-password-link">¿Olvidó su contraseña?</a>
                        </div>
                        <button type="submit" className="submit-button">Iniciar Sesión</button>
                    </form>
                    <p className="auth-footer-link">
                        ¿Aún no eres miembro? <a href="/register">Regístrate</a> {/* Adjust href for routing */}
                    </p>
                </div>
            </div>
            <div 
                className="auth-image-container"
                style={{ backgroundImage: `url(${authBgImage})` }}
            ></div>
        </div>
    );
}

export default LoginPage;