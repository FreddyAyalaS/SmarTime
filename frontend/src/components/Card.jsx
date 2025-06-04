// src/components/Card/Card.jsx
import React from 'react';
// import styles from './Card.module.css'; // Si usas CSS Modules
// import './Card.css'; // Si usas CSS global

const Card = ({ children, title, className = '', titleClassName = '' }) => {
  const cardClasses = `card ${className}`;
  // Si no se pasa titleClassName, usa 'card-title' por defecto
  const finalTitleClasses = `card-title ${titleClassName}`;

  return (
    <div className={cardClasses}>
      {title && <h1 className={finalTitleClasses}>{title}</h1>}
      {children}
    </div>
  );
};

export default Card;