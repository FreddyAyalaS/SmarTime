// src/services/taskService.mock.js
import taskData from '../data/taskData.js';

let tasks = [...taskData]; // Copia local modificable

export const getTasks = async () => {
  return Promise.resolve(tasks);
};

export const createTask = async (taskData) => {
  const newTask = { ...taskData, id: Date.now(), completado: false };
  tasks.push(newTask);
  return Promise.resolve(newTask);
};

export const updateTask = async (taskId, taskUpdateData) => {
  tasks = tasks.map(t => (t.id === taskId ? { ...t, ...taskUpdateData } : t));
  return Promise.resolve(tasks.find(t => t.id === taskId));
};

export const deleteTask = async (taskId) => {
  tasks = tasks.filter(t => t.id !== taskId);
  return Promise.resolve({ success: true });
};

export const updateTaskStatus = async (taskId, newState) => {
  tasks = tasks.map(t =>
    t.id === taskId ? { ...t, estado: newState, completado: newState === 'finalizado' } : t
  );
  return Promise.resolve(tasks.find(t => t.id === taskId));
};
