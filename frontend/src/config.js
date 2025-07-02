export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api'; 
// src/config.js
export const USE_MOCK_TASKS = true; // Cambia a false cuando uses el backend real

const USE_MOCK_USER_SERVICE = false; // Cambia a true para usar el mock

export default {
  USE_MOCK_USER_SERVICE,
};