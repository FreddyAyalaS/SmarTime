import apiClient from '..services/apiClient'; 

// Datos mock iniciales para el perfil del usuario
let userProfileData = {
  id: 'user-1',
  name: 'Sebastian Santiago Ayala Alberca',
  username: 'Draco',
  email: 'sebastianayala1@unmsm.edu.pe',
  career: 'Ing. de software',
  birthDate: '25 Diciembre 2004',
  // profileImageUrl: 'url_a_la_imagen_o_null' // Podrías añadir esto
};

/**
 * Obtiene los datos del perfil del usuario actualmente autenticado.
 * @returns {Promise<object>} - Promesa que resuelve con los datos del perfil.
 */
export const getUserProfile = async () => {
  console.log('userService: Obteniendo perfil de usuario...');
  // Simulación: Devolvemos los datos mock después de un pequeño retraso
  // En una app real, el token de autenticación se enviaría automáticamente
  // por el interceptor de apiClient si está configurado, o lo añadirías aquí.
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('userService: Perfil obtenido (simulado):', userProfileData);
      resolve(userProfileData);
    }, 500);
  });

  // // Llamada real a la API (cuando tengas tu backend)
  // try {
  //   // Asume que el token ya está siendo enviado por apiClient si está configurado con interceptor
  //   // o añádelo a las cabeceras aquí si lo manejas manualmente para rutas protegidas
  //   const token = localStorage.getItem('authToken');
  //   const response = await apiClient.get('/users/profile', {
  //     headers: {
  //       ...(token && { 'Authorization': `Bearer ${token}` })
  //     }
  //   });
  //   return response.data; // Asume que el backend devuelve el objeto del perfil
  // } catch (error) {
  //   const errorMessage = error.response?.data?.message || error.message || 'Error al obtener el perfil.';
  //   console.error('Error en getUserProfile service:', errorMessage);
  //   throw new Error(errorMessage);
  // }
};

/**
 * Actualiza los datos del perfil del usuario.
 * @param {object} profileDataToUpdate - Objeto con los campos del perfil a actualizar.
 * @returns {Promise<object>} - Promesa que resuelve con los datos del perfil actualizados.
 */
export const updateUserProfile = async (profileDataToUpdate) => {
  console.log('userService: Actualizando perfil con:', profileDataToUpdate);
  // Simulación: Actualizamos los datos mock y los devolvemos
  return new Promise((resolve) => {
    setTimeout(() => {
      userProfileData = { ...userProfileData, ...profileDataToUpdate };
      // En una simulación, no actualizaremos la contraseña aquí si se envía
      // ya que usualmente es un flujo diferente.
      if (profileDataToUpdate.password) {
        console.warn("userService (simulación): La actualización de contraseña debería manejarse por separado.");
        delete userProfileData.password; // No guardamos la "nueva contraseña" simulada en el perfil mock
      }
      console.log('userService: Perfil actualizado (simulado):', userProfileData);
      resolve({ message: 'Perfil actualizado exitosamente', user: userProfileData });
    }, 1000);
  });

  // // Llamada real a la API
  // try {
  //   const token = localStorage.getItem('authToken');
  //   const response = await apiClient.put('/users/profile', profileDataToUpdate, { // O POST/PATCH según tu API
  //     headers: {
  //       ...(token && { 'Authorization': `Bearer ${token}` })
  //     }
  //   });
  //   return response.data; // Asume que el backend devuelve el perfil actualizado o un mensaje
  // } catch (error) {
  //   const errorMessage = error.response?.data?.message || error.message || 'Error al actualizar el perfil.';
  //   console.error('Error en updateUserProfile service:', errorMessage);
  //   throw new Error(errorMessage);
  // }
};

/**
 * Cambia la contraseña del usuario. (Opcional aquí, podría estar en authService)
 * @param {object} passwordData - Objeto con { currentPassword, newPassword }.
 * @returns {Promise<object>} - Promesa que resuelve con un mensaje de éxito.
 */
export const changePassword = async (passwordData) => {
  console.log('userService: Intentando cambiar contraseña...');
  // Simulación
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simula una validación simple
      if (!passwordData.currentPassword || !passwordData.newPassword) {
        reject(new Error('Contraseña actual y nueva son requeridas.'));
        return;
      }
      if (passwordData.currentPassword === "password123") { // Simula que la contraseña actual es correcta
        console.log('userService: Contraseña cambiada exitosamente (simulado).');
        resolve({ message: 'Contraseña actualizada exitosamente.' });
      } else {
        reject(new Error('La contraseña actual es incorrecta.'));
      }
    }, 1000);
  });

  // // Llamada real a la API (endpoint podría ser /users/change-password o /auth/change-password)
  // try {
  //   const token = localStorage.getItem('authToken');
  //   const response = await apiClient.post('/users/change-password', passwordData, {
  //     headers: {
  //       ...(token && { 'Authorization': `Bearer ${token}` })
  //     }
  //   });
  //   return response.data;
  // } catch (error) {
  //   const errorMessage = error.response?.data?.message || error.message || 'Error al cambiar la contraseña.';
  //   console.error('Error en changePassword service:', errorMessage);
  //   throw new Error(errorMessage);
  // }
};