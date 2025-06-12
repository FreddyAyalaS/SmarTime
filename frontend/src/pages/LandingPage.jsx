import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Icons/logo.svg'; // Importar el logo
import ChicoSmartTime from '../assets/Icons/chico-smartime.svg'; // Importar la imagen del chico

// Importar el archivo CSS
import '../styles/LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page-container">
            {/* Header */}
            <header className="header">
                <nav className="navbar">
                    <div className="logo-container">
                        <img src={Logo} alt="SmartTime Logo" className="logo" />
                        <span className="site-title">SmartTime</span>
                    </div>
                    <ul className="menu">
                        <li>
                            <Link to="/quienes-somos" className="menu-link">
                                <span>¿Quiénes somos?</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/funcionalidades" className="menu-link">
                                <span>Funcionalidades</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/contacto" className="menu-link">
                                <span>Contáctanos</span>
                            </Link>
                        </li>
                    </ul>
                    <Link to="/login" className="login-button">
                        Iniciar Sesión
                    </Link>
                </nav>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <section className="content-section">
                    {/* Sección de Texto e Imagen */}
                    <div className="text-and-image-section">
                        {/* Sección de Texto */}
                        <div className="text-section">
                            <h1 className="title">
                                Deja de sentirte abrumado.<br />Organiza tus estudios fácilmente con <span className="highlight">Smart-Time</span>
                            </h1>
                            <p className="description">
                                Organiza tu vida académica sin esfuerzo. Smart-Time te ayuda a planificar sesiones, seguir tareas y cumplir plazos.
                                Concéntrate mejor con el <span className="bold-text">modo anti-procrastinación</span> y optimiza tu rutina con <span className="bold-text">sugerencias inteligentes</span>.
                                Di adiós al estrés y hola a la productividad con nuestra plataforma intuitiva todo en uno.
                            </p>
                        </div>

                        {/* Imagen del Chico Trabajando */}
                        <div className="image-section">
                            <img src={ChicoSmartTime} alt="Estudiante usando Smart-Time" className="hero-image" />
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <p>© 2025 SmartTime | All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default LandingPage;