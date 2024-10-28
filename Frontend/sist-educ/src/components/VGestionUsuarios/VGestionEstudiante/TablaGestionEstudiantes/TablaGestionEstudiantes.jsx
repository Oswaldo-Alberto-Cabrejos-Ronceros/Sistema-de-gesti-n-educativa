import React, { useState } from "react";
import "./TablaGestionEstudiantes.css";
import PrimaryButton from "../../../generalsComponets/PrimaryButton/PrimaryButton";

function TablaGestionEstudiantes({ estudiantes, onStudentDeleted }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleDeleteClick = (estudianteId) => {
    setSelectedStudent(estudianteId);
    setShowConfirmModal(true); // Mostrar el modal de confirmación
  };

  const confirmDelete = async () => {
    try {
      await AlumnoService.deleteAlumno(selectedStudent);
      onStudentDeleted(selectedStudent);
      setError(null); // Resetea el error si la eliminación fue exitosa
    } catch (error) {
      console.error("Error al eliminar el estudiante:", error);
      setError("No se puede eliminar el estudiante debido a dependencias.");
    } finally {
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="TablaGestionEstudiantesContainer">
      {estudiantes.length === 0 ? (
        <div className="TablaGestionEstudianteVerDocEmpty">
          <h3>No hay Alumnos registrados</h3>
        </div>
      ) : (
        <div>
          <table className="TableGestionEstudiante">
            <thead>
              <tr>
                <th>Dni</th>
                <th>Apellidos</th>
                <th>Nombres</th>
                <th>Celular</th>
                <th>Correo</th>
                <th>Nivel</th>
                <th>Grado</th>
                <th>Seccion</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante) => (
                <tr key={estudiante.usuarioId}>
                  <td>{estudiante.dni}</td>
                  <td>{estudiante.apellido}</td>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.telefono}</td>
                  <td>{estudiante.codigo}</td>
                  <td>{estudiante.nivel}</td>
                  <td>{estudiante.grado}</td>
                  <td>{estudiante.seccion}</td>
                  <td>
                    <PrimaryButton
                      onClick={() => fEditar(estudiante.usuarioId)}
                      nombre="Editar"
                    />
                  </td>
                  <td>
                    <PrimaryButton
                      onClick={() => handleDeleteClick(estudiante.usuarioId)}
                      nombre="Eliminar"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

{/* Modal de Confirmación */}
{showConfirmModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modalContent}>
            <h4>¿Estás seguro de que deseas eliminar este alumno?</h4>
            {error && <p style={modalStyles.errorMessage}>{error}</p>}
            <div style={modalStyles.buttonContainer}>
              <button onClick={confirmDelete} style={{ ...modalStyles.button, ...modalStyles.yesButton }}>
                Sí
              </button>
              <button onClick={() => setShowConfirmModal(false)} style={{ ...modalStyles.button, ...modalStyles.noButton }}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  errorMessage: {
    color: "red",
    marginTop: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  button: {
    padding: "8px 16px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  yesButton: {
    backgroundColor: "red",
    color: "white",
  },
  noButton: {
    backgroundColor: "green",
    color: "white",
  },
};


export default TablaGestionEstudiantes;