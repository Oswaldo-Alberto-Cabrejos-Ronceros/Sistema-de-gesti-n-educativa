import React from 'react';
import './VEstudiante.css'

function VEstudiante({ cursos, tareas }) {
  return (
    <div className="container">
      <div className="main-content">
        <h2>Mis cursos</h2>
        <h3>2024 - Ciclo 2 Agosto PREG (001) (Actual)</h3>

        <div className="course-list">
          {cursos.map((curso, index) => (
            <div key={index} className="course-card">
              <img src={curso.imagen} alt={`Imagen de ${curso.nombre}`} />
              <div className="course-details">
                <h4>{curso.nombre}</h4>
                <p>{curso.codigo} - {curso.modalidad}</p>
                <p>{curso.profesor}</p>
              </div>
              <div className="course-progress">
                <p>{curso.progreso}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar">
        <h3>Actividades semanales</h3>
        <ul className="task-list">
          {tareas.map((tarea, index) => (
            <li key={index} className="task-item">
              <p className="task-title">Tarea no calificada</p>
              <a href="#">{tarea.titulo}</a>
              <p>{tarea.curso}</p>
              <p>Vence: {tarea.fechaVencimiento}</p>
              <button>Por entregar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VEstudiante;