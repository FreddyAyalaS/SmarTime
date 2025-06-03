import React from "react";
import '../styles/Navbar.css';
import logoImage from '../assets/Logo.png'; // Asumiendo que Logo.png está en src/assets

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <img src={logoImage} alt="SmartTime Logo" className="logo" />
                 <h1 className="Tittle">SmartTime</h1> 
            </div>
                   
            {/* Nuevo contenedor para agrupar los links y el botón */}
            <div className="navbar-content-right">
                <nav className="navbar-right"> {/* La clase original para la navegación */}
                    <ul>
                        <li><a href="/who">¿Quiénes somos?</a></li>
                        <li><a href="/func">Funcionalidad</a></li>
                        <li><a href="/contact">Contacto</a></li>
                    </ul>
                </nav>
                <button className="loginButton">
                    Iniciar Sesión
                </button>
            </div>
        </header>
    );
}
export default Navbar;