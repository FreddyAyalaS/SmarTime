// src/services/authService.js
import apiClient from './apiClient';

export const loginUser = async (credentials) => {
  console.log('authService (apiClient): Intentando login con:', credentials);
  try {
    const response = await apiClient.post('/auth/login', credentials);
    console.log('authService (apiClient): Login exitoso:', response.data);
    if (response.data.token && response.data.user) {
      // El guardado del token debería manejarse en otro lugar
    }
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Error desconocido al iniciar sesión.';
    console.error('Error en loginUser service (apiClient):', errorMessage);
    throw new Error(errorMessage);
  }
};

export const registerUser = async (userData) => {
  console.log('authService (apiClient): Intentando registrar con:', userData);
  try {
    const response = await apiClient.post('/auth/register', userData);
    console.log('authService (apiClient): Registro exitoso:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Error desconocido durante el registro.';
    console.error('Error en registerUser service (apiClient):', errorMessage);
    throw new Error(errorMessage);
  }
};

export const requestPasswordReset = async (email) => {
  console.log('authService (apiClient): Solicitando restablecimiento para:', email);
  try {
    const response = await apiClient.post('/auth/forgot-password', { email });
    console.log('authService (apiClient): Solicitud de restablecimiento enviada:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Error desconocido al solicitar restablecimiento.';
    console.error('Error en requestPasswordReset service (apiClient):', errorMessage);
    throw new Error(errorMessage);
  }
};
