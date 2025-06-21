// src/pages/TasksPage/TasksPage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/TaskPage.css'; // O .module.css

// Importa tus componentes REALES
import TaskItem from '../components/TaskItem';
import TaskFormModal from '../components/TaskFormModal';
import Button from '../components/Button';

import { getTasks, createTask, updateTask, deleteTask, updateTaskStatus } from '../services/taskService';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // Para editar una tarea

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError('');
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks || []);
      } catch (err) {
        setError(err.message || 'Error al cargar las tareas.');
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleOpenNewTaskModal = () => {
    setEditingTask(null); // Asegura que no haya datos de edición
    setShowTaskModal(true);
  };

  const handleOpenEditTaskModal = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleFormSubmit = async (taskData) => {
    setIsLoading(true); // O un isLoading específico para el modal
    setError('');
    try {
      if (editingTask && editingTask.id) { // Si estamos editando
        const updatedTask = await updateTask(editingTask.id, taskData);
        setTasks(prevTasks => prevTasks.map(t => t.id === editingTask.id ? updatedTask : t));
      } else { // Si estamos creando
        const createdTask = await createTask(taskData);
        setTasks(prevTasks => [...prevTasks, createdTask]);
      }
      setShowTaskModal(false);
      setEditingTask(null);
    } catch (err) {
      setError(err.message || (editingTask ? 'Error al actualizar la tarea.' : 'Error al crear la tarea.'));
      // No cerrar el modal en caso de error para que el usuario pueda corregir
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await deleteTask(taskId);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      } catch (err) {
        setError(err.message || 'Error al eliminar la tarea.');
      }
    }
  };

  const handleToggleComplete = async (taskId, isCompleted) => {
    // Esta función ahora debería cambiar el 'estado' a 'finalizado' o 'en_desarrollo'
    const newStatus = isCompleted ? 'en_desarrollo' : 'finalizado'; // Invierte el estado de completado
    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus);
      // También actualizamos el campo 'completado' para el check visual,
      // asumiendo que 'finalizado' implica 'completado: true'
      updatedTask.completado = newStatus === 'finalizado';
      setTasks(prevTasks => prevTasks.map(t => t.id === taskId ? updatedTask : t));
    } catch (err) {
      setError(err.message || 'Error al actualizar la tarea.');
    }
  };

  const handleSetStatus = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus);
      updatedTask.completado = newStatus === 'finalizado'; // Sincroniza 'completado'
      setTasks(prevTasks => prevTasks.map(t => t.id === taskId ? updatedTask : t));
    } catch (err) {
      setError(err.message || 'Error al cambiar el estado de la tarea.');
    }
  };

  // Clases (como las tenías)
  const pageContainerClasses = "tasks-page-container";
  const pageHeaderClasses = "tasks-page-header";
  const pageTitleClasses = "tasks-page-title";
  const addTaskButtonClasses = "tasks-add-button";
  const tasksTableContainerClasses = "tasks-table-container";
  const tasksTableClasses = "tasks-table";
  const errorMessageClasses = "tasks-error-message";
  const loadingMessageClasses = "tasks-loading-message";

  return (
    <div className={pageContainerClasses}>
      <div className={pageHeaderClasses}>
        <h1 className={pageTitleClasses}>Lista de Tareas</h1>
        <Button onClick={handleOpenNewTaskModal} className={addTaskButtonClasses} variant="primary">
          + Añadir Tarea
        </Button>
      </div>

      {isLoading && tasks.length === 0 && <p className={loadingMessageClasses}>Cargando tareas...</p>}
      {error && <p className={errorMessageClasses}>{error}</p>}

      {!isLoading && !error && tasks.length === 0 && (
        <p>No hay tareas. ¡Crea una nueva!</p>
      )}

      {!isLoading && !error && tasks.length > 0 && (
        <div className={tasksTableContainerClasses}>
          <table className={tasksTableClasses}>
            <thead>
              <tr>
                <th>Tarea</th>
                <th>Curso</th>
                <th>Complejidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <TaskItem // Usa el componente real
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  onSetStatus={handleSetStatus}
                  onEdit={handleOpenEditTaskModal} // Pasa la función para editar
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TaskFormModal
        isOpen={showTaskModal}
        onClose={() => { setShowTaskModal(false); setEditingTask(null); }}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
      />
    </div>
  );
};

export default TasksPage;