// src/components/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'; // Si lo estás usando

const Button = ({
  // ... todas tus props
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  fullWidth = false,
  iconOnly = false,
}) => {
  // ... toda la lógica de tus clases (baseStyles, variantStyles, sizeStyles, etc.)
  const baseStyles = 'font-medium rounded-lg focus:outline-none focus:ring-4 transition-all duration-150 ease-in-out inline-flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-indigo-300 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-800',
    ghost: 'text-indigo-600 hover:bg-indigo-100 focus:ring-indigo-300 dark:text-indigo-400 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800',
  };

  const sizeStyles = {
    sm: iconOnly ? 'p-2 text-sm' : 'px-3 py-1.5 text-xs',
    md: iconOnly ? 'p-2.5 text-base' : 'px-5 py-2.5 text-sm',
    lg: iconOnly ? 'p-3 text-lg' : 'px-6 py-3 text-base',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md active:scale-95';
  const widthStyles = fullWidth ? 'w-full' : '';


  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabledStyles,
        widthStyles,
        className
      )}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  iconOnly: PropTypes.bool,
};

export default Button; // <--- Verifica esta línea