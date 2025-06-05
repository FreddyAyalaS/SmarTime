// src/components/Input/Input.jsx
import React from 'react';
// Asume que crearás 'Input.module.css' o 'Input.css' e importarás los estilos
// import styles from './Input.module.css'; // Si usas CSS Modules
// import './Input.css'; // Si usas CSS global para este componente

const Input = ({ label, type = 'text', name, value, onChange, placeholder, error, required = false, className = '' }) => {
  const inputId = name || label?.toLowerCase().replace(/\s+/g, '-') || `input-${Math.random().toString(36).substring(7)}`;

  // Clase base para el contenedor del input
  const groupClasses = `input-group ${className}`; // 'input-group' será tu clase principal en el CSS
  // Clases para el input y label (podrías añadir más si necesitas variantes)
  const labelClasses = "input-label";
  const inputFieldClasses = `input-field ${error ? 'input-field-error' : ''}`;
  const errorMessageClasses = "input-error-message";
  const requiredIndicatorClasses = "input-required-indicator";


  return (
    <div className={groupClasses}>
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required && <span className={requiredIndicatorClasses}>*</span>}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputFieldClasses}
        aria-invalid={error ? "true" : "false"}
      />
      {error && <p className={errorMessageClasses}>{error}</p>}
    </div>
  );
};

export default Input;