// src/components/TaskFormModal.jsx
import React, { useState, useEffect } from 'react';
import '../styles/TaskFormModal.css'; // O .module.css
import Input from './Input'; // Ajusta la ruta
import Button from './Button'; // Ajusta la ruta

const TaskFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  // Estados para los campos del formulario
  const [titulo, setTitulo] = useState('');
  const [curso, setCurso] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha_entrega, setFechaEntrega] = useState('');
  const [hora_entrega, setHoraEntrega] = useState('');
  const [complejidad, setComplejidad] = useState(1); // Default a 1
  const [estado, setEstado] = useState('inicio'); // Default a 'inicio'

  // Efecto para popular el formulario si se pasa initialData (para editar)
  useEffect(() => {
    if (initialData) {
      setTitulo(initialData.titulo || '');
      setCurso(initialData.curso || '');
      setDescripcion(initialData.descripcion || '');
      setFechaEntrega(initialData.fecha_entrega || '');
      setHoraEntrega(initialData.hora_entrega || '');
      setComplejidad(initialData.complejidad || 1);
      setEstado(initialData.estado || 'inicio');
    } else {
      // Resetear formulario si no hay initialData (para crear nuevo)
      setTitulo('');
      setCurso('');
      setDescripcion('');
      setFechaEntrega('');
      setHoraEntrega('');
      setComplejidad(1);
      setEstado('inicio');
    }
  }, [initialData, isOpen]); // Se ejecuta cuando initialData o isOpen cambian

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      titulo,
      curso,
      descripcion,
      fecha_entrega,
      hora_entrega,
      complejidad: parseInt(complejidad, 10), // Asegurar que sea número
      estado,
      // Si es edición, podrías necesitar pasar el id:
      ...(initialData && { id: initialData.id }),
      // El backend asignará 'completado' basado en 'estado' o lo manejará por separado
    };
    onSubmit(taskData);
  };

  if (!isOpen) {
    return null; // No renderizar el modal si no está abierto
  }

  // Clases que definirás en TaskFormModal.css
  const modalOverlayClasses = "task-form-modal-overlay";
  const modalContentClasses = "task-form-modal-content";
  const modalHeaderClasses = "task-form-modal-header";
  const modalTitleClasses = "task-form-modal-title";
  const modalCloseButtonClasses = "task-form-modal-close-button";
  const modalBodyClasses = "task-form-modal-body";
  const modalFormClasses = "task-form-actual-form"; // Para el <form>
  const modalFooterClasses = "task-form-modal-footer";
  const cancelButtonClasses = "task-form-cancel-button";
  const submitButtonClasses = "task-form-submit-button";


  return (
    <div className={modalOverlayClasses} onClick={onClose}> {/* Cierra al hacer clic en el overlay */}
      <div className={modalContentClasses} onClick={(e) => e.stopPropagation()}> {/* Evita que el clic en el contenido cierre el modal */}
        <div className={modalHeaderClasses}>
          <h3 className={modalTitleClasses}>
            {initialData ? 'Editar Tarea' : 'Añadir Nueva Tarea'}
          </h3>
          <button onClick={onClose} className={modalCloseButtonClasses}>×</button>
        </div>
        <div className={modalBodyClasses}>
          <form onSubmit={handleSubmit} className={modalFormClasses}>
            <Input label="Título de la Tarea" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            <Input label="Curso" name="curso" value={curso} onChange={(e) => setCurso(e.target.value)} />
            <Input label="Descripción (Opcional)" name="descripcion" type="textarea" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} /> {/* Asume que tu Input puede ser textarea */}
            <Input label="Fecha de Entrega" name="fecha_entrega" type="date" value={fecha_entrega} onChange={(e) => setFechaEntrega(e.target.value)} />
            <Input label="Hora de Entrega" name="hora_entrega" type="time" value={hora_entrega} onChange={(e) => setHoraEntrega(e.target.value)} />
            <Input label="Complejidad (1-5)" name="complejidad" type="number" min="1" max="5" value={complejidad} onChange={(e) => setComplejidad(e.target.value)} />
            <div> {/* Contenedor para el select de estado */}
              <label htmlFor="estado-tarea" className="input-label">Estado</label> {/* Reutiliza clase de Input.css si quieres */}
              <select
                id="estado-tarea"
                name="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="input-field" /* Reutiliza clase de Input.css */
              >
                <option value="inicio">Inicio</option>
                <option value="en_desarrollo">En Desarrollo</option>
                <option value="finalizado">Finalizado</option>
              </select>
            </div>
            <div className={modalFooterClasses}>
              <Button type="button" variant="secondary" onClick={onClose} className={cancelButtonClasses}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" className={submitButtonClasses}>
                {initialData ? 'Guardar Cambios' : 'Crear Tarea'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskFormModal;