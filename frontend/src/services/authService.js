// src/services/authService.js
import apiClient from './apiClient';

const AUTH_BASE_PATH = '/autenticacion'; // Centraliza el prefijo de la ruta

/**
 * Extrae un mensaje de error legible desde un error de Axios.
 * @param {Error} error - El objeto de error de Axios.
 * @param {string} defaultMessage - Mensaje por defecto si no se encuentra uno específico.
 * @returns {string} - El mensaje de error.
 */
const getErrorMessage = (error, defaultMessage) => {
  // Intenta obtener mensajes de error comunes del backend
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (data.detail) return data.detail; // Común en Django REST Framework
    if (data.message) return data.message;
    if (typeof data === 'string') return data; // A veces el error es solo un string
    // Si 'data' es un objeto con errores por campo (ej. { email: ["Este campo es requerido."]})
    if (typeof data === 'object' && Object.keys(data).length > 0) {
      const fieldErrors = Object.values(data).flat().join(' '); // Concatena todos los mensajes de error de campo
      if (fieldErrors) return fieldErrors;
    }
  }
  return error.message || defaultMessage;
};

/**
 * Inicia sesión de un usuario.
 * @param {object} credentials - Credenciales del usuario.
 * @param {string} credentials.username - Nombre de usuario (o email si el backend lo usa).
 * @param {string} credentials.password - Contraseña.
 * @returns {Promise<object>} Promesa que resuelve con los datos de la sesión (ej. token, datos del usuario).
 * @throws {Error} Si el login falla.
 */
export const loginUser = async (credentials) => {
  console.log('authService: Intentando login con:', credentials);
  try {
    const response = await apiClient.post(`${AUTH_BASE_PATH}/login/`, credentials);
    console.log('authService: Login exitoso:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error al iniciar sesión. Verifica tus credenciales.');
    console.error('Error en loginUser service:', errorMessage, error.response);
    throw new Error(errorMessage);
  }
};

/**
 * Registra un nuevo usuario.
 * @param {object} userData - Datos del usuario para el registro.
 * @returns {Promise<object>} Promesa que resuelve con la respuesta del backend (ej. mensaje, datos del usuario).
 * @throws {Error} Si el registro falla.
 */
export const registerUser = async (userData) => {
  console.log('authService: Intentando registrar con:', userData);
  try {
    const response = await apiClient.post(`${AUTH_BASE_PATH}/registro/`, userData);
    console.log('authService: Registro exitoso:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error durante el registro. Inténtalo de nuevo.');
    console.error('Error en registerUser service:', errorMessage, error.response);
    throw new Error(errorMessage);
  }
};

/**
 * Solicita un restablecimiento de contraseña para un email.
 * @param {string} email - El correo electrónico del usuario.
 * @returns {Promise<object>} Promesa que resuelve con la respuesta del backend (ej. un mensaje).
 * @throws {Error} Si la solicitud falla.
 */
export const requestPasswordReset = async (email) => {
  console.log('authService: Solicitando restablecimiento para:', email);
  try {
    const response = await apiClient.post(`${AUTH_BASE_PATH}/solicitarNuevaContrasena/`, { email });
    console.log('authService: Solicitud de restablecimiento enviada:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error al solicitar el restablecimiento de contraseña.');
    console.error('Error en requestPasswordReset service:', errorMessage, error.response);
    throw new Error(errorMessage);
  }
};

/**
 * Cierra la sesión del usuario.
 * Limpia el token de autenticación del localStorage.
 * Intenta notificar al backend sobre el logout.
 * @returns {Promise<object|null>} Promesa que resuelve con la respuesta del backend o null si solo fue local.
 * @throws {Error} Si el logout en el backend falla (opcionalmente, podrías no lanzar error aquí).
 */
export const logoutUser = async () => {
  console.log('authService: Intentando cerrar sesión...');
  localStorage.removeItem('authToken');
  try {
    const response = await apiClient.post(`${AUTH_BASE_PATH}/logout/`, {});
    console.log('authService: Logout en backend exitoso:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error durante el logout en el servidor, pero la sesión local ha sido limpiada.');
    console.warn('Error en logoutUser service (backend call):', errorMessage, error.response);
    return null;
  }
};

/**
 * Establece una nueva contraseña usando un token de restablecimiento.
 * Endpoint: /autenticacion/generarNuevaContrasena/
 * @param {string} token - El token recibido en el enlace de restablecimiento.
 * @param {string} newPassword - La nueva contraseña.
 * @returns {Promise<object>} Promesa que resuelve con la respuesta del backend.
 * @throws {Error} Si falla la generación de la nueva contraseña.
 */
export const resetPasswordWithToken = async (token, newPassword) => { // <--- FUNCIÓN AÑADIDA/ACTIVADA
  console.log('authService: Intentando generar nueva contraseña...');
  try {
    // OPCIÓN 1: Si el backend espera el token y la nueva contraseña en el cuerpo del POST
    const payload = {
      token: token,
      password: newPassword, // O el nombre de campo que espere tu backend, ej: new_password
    };
    const response = await apiClient.post(`${AUTH_BASE_PATH}/generarNuevaContrasena/`, payload);

    // OPCIÓN 2: Si el backend espera el token como parte de la URL
    // (ej. /autenticacion/generarNuevaContrasena/<token>/)
    // y solo la nueva contraseña en el cuerpo:
    // const response = await apiClient.post(`${AUTH_BASE_PATH}/generarNuevaContrasena/${token}/`, { password: newPassword });

    console.log('authService: Nueva contraseña generada:', response.data);
    return response.data; // Asume que devuelve un mensaje de éxito
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error al generar la nueva contraseña. El token podría ser inválido o haber expirado.');
    console.error('Error en resetPasswordWithToken service:', errorMessage, error.response);
    throw new Error(errorMessage);
  }
};