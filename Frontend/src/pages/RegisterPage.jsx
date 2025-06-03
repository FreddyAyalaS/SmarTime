// src/components/RegisterPage.js
import React, { useState } from 'react';
import '../styles/AuthPage.css'; // Shared styles
import appLogo from '../assets/Logo.png';
import authBgImage from '../assets/icons/auth-background.png'; // Your background image

function RegisterPage() {
    const [formData, setFormData] = useState({
        nombre: '',
        usuario: '',
        email: '',
        fechaNacimiento: '',
        carrera: '',
        // Add password and confirmPassword fields if needed for registration
        // password: '',
        // confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering with:', formData);
        // Add actual registration logic here
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <header className="auth-header">
                    <img src={appLogo} alt="SmarTime Logo" className="auth-logo" />
                    <h1 className="auth-brand-title">SmarTime</h1>
                </header>
                <div className="form-wrapper">
                    <h2>Regístrate</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Ingrese su nombre completo"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="usuario">Usuario</label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="Ingrese su usuario"
                                value={formData.usuario}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Ingrese su email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                            <input
                                type="text" // Consider using type="date" for better UX
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                placeholder="dd / mm / aaaa"
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="carrera">Carrera</label>
                            <input
                                type="text"
                                id="carrera"
                                name="carrera"
                                placeholder="Ingrese su carrera"
                                value={formData.carrera}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Add password fields here if your registration requires them */}
                        <button type="submit" className="submit-button">Registrarse</button>
                    </form>
                    <p className="auth-footer-link">
                        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a> {/* Adjust href for routing */}
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

export default RegisterPage;