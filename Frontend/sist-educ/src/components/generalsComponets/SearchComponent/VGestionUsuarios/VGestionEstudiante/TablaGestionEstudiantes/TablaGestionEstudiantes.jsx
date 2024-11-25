import React, { useState } from "react";
import "./TablaGestionEstudiantes.css";
import AlumnoService from "../../../../services/alumnoService";
import PrimaryButton from "../../../generalsComponets/PrimaryButton/PrimaryButton";
import EditEstudianteModal from "../../Modals/EditEstudianteModal";
import DeleteUserModal from "../../Modals/DeleteUserModal";
import ConfirmationModal from "../../Modals/ConfirmacionModal";
import PaginacionComponent from "../../../PaginacionComponent/PaginacionComponent";

function TablaGestionEstudiantes({
  estudiantes,
  onStudentDeleted,
  onStudentUpdated,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  //cambios paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24);
  const indexOfLastItem = currentPage * itemsPerPage;
  console.log(currentPage, itemsPerPage);
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = estudiantes.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  console.log(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);

  const handleDeleteClick = (estudianteId) => {
    setSelectedStudent(estudianteId);
    setShowDeleteModal(true);
  };

  const handleEditClick = (estudiante) => {
    setSelectedStudent(estudiante);
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    try {
      await AlumnoService.deleteAlumno(selectedStudent);
      onStudentDeleted(selectedStudent);
      showConfirmationMessage("Alumno eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar:", error); // Asegúrate de ver el error en consola
      showConfirmationMessage("Error al eliminar el alumno");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await AlumnoService.AdminUpdateAlumno(
        selectedStudent.usuarioId,
        updatedData
      );
      onStudentUpdated(response.data); // Actualizar en la lista de estudiantes
      showConfirmationMessage("Alumno actualizado correctamente");
    } catch (error) {
      console.error("Error en la actualización:", error); // Verificar en consola el error
      showConfirmationMessage("El DNI proporcionado ya existe"); // Mensaje de error
    } finally {
      setShowEditModal(false);
    }
  };

  const showConfirmationMessage = (message) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 1700);
  };

  return (
    <div className="TablaGestionEstudiantesContainer">
      <ConfirmationModal
        show={showConfirmation}
        message={confirmationMessage}
      />

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
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Codigo</th>
                <th>Celular</th>
                <th>Nivel</th>
                <th>Grado</th>
                <th>Seccion</th>
                <th>FechaNac</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((estudiante) => (
                <tr key={estudiante.usuarioId}>
                  <td>{estudiante.dni}</td>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.apellido}</td>
                  <td>{estudiante.codigo}</td>
                  <td>{estudiante.telefono}</td>
                  <td>{estudiante.nivel}</td>
                  <td>{estudiante.grado}</td>
                  <td>{estudiante.seccion}</td>
                  <td>{estudiante.fechaNacimiento}</td>
                  <td>
                    <PrimaryButton
                      onClick={() => handleEditClick(estudiante)}
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
          <PaginacionComponent
            totalItems={estudiantes.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <DeleteUserModal
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      <EditEstudianteModal
        show={showEditModal}
        student={selectedStudent}
        onUpdate={handleUpdate}
        onClose={() => setShowEditModal(false)}
      />
    </div>
  );
}

export default TablaGestionEstudiantes;
