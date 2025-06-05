// src/components/Button/Button.jsx
import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', fullWidth = false, disabled = false, className = '' /* Dejamos className por si se quiere pasar algo externo */ }) => {
  // La lógica de qué clases aplicar basada en 'variant' o 'fullWidth' se haría cuando se añadan los estilos.
  // Por ahora, solo pasamos las props básicas al elemento <button>.

  // Estilos en línea solo como placeholders para ver las variantes (¡esto NO es lo ideal para producción!)
  // Se reemplazarían completamente con clases CSS.
  let buttonStyle = {
    padding: '10px 15px',
    margin: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  if (variant === 'primary') {
    buttonStyle.backgroundColor = '#007bff';
    buttonStyle.color = 'white';
  } else if (variant === 'secondary') {
    buttonStyle.backgroundColor = '#6c757d';
    buttonStyle.color = 'white';
  } else if (variant === 'google') {
    buttonStyle.backgroundColor = 'white';
    buttonStyle.color = '#333';
    buttonStyle.border = '1px solid #ddd';
  }

  if (fullWidth) {
    buttonStyle.width = '100%';
  }

  if (disabled) {
    buttonStyle.opacity = 0.5;
    buttonStyle.cursor = 'not-allowed';
  }


  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className} // Para cualquier clase externa que se quiera pasar
      style={buttonStyle} // ¡SOLO PARA DEMOSTRACIÓN VISUAL INICIAL! Quitar al añadir CSS real.
    >
      {children}
    </button>
  );
};

export default Button;