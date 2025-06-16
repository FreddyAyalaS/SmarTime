// src/services/apiClient.js
import axios from 'axios';

// Define tu URL base. Es ideal que venga de una variable de entorno.
// Para Create React App, la variable debe empezar con REACT_APP_
// Ejemplo en tu archivo .env (en la raíz de tu proyecto frontend):
// REACT_APP_API_URL=http://localhost:5001/api
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api'; // Ajusta el puerto si es necesario

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Puedes añadir otras cabeceras por defecto aquí si siempre son necesarias
    // 'X-Requested-With': 'XMLHttpRequest',
  },
  // timeout: 10000, // Opcional: tiempo de espera para las peticiones en milisegundos
});

// Por ahora, no añadiremos interceptores para mantenerlo simple.
// Si más adelante necesitas añadir el token JWT automáticamente a todas
// las peticiones o manejar errores globalmente, los interceptores son el lugar.

export default apiClient;