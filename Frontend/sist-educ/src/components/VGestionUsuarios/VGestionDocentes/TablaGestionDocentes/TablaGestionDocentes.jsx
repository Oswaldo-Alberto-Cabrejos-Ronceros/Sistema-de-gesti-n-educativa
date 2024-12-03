import React, { useState } from "react";
import "./TablaGestionDocentes.css";
import DocenteService from "../../../../services/docenteService";
import PrimaryButton from "../../../generalsComponets/PrimaryButton/PrimaryButton";
import EditDocenteModal from "../../Modals/EditDocenteModal";
import DeleteUserModal from "../../Modals/DeleteUserModal";
import ConfirmationModal from "../../Modals/ConfirmacionModal";
import PaginacionComponent from "../../../generalsComponets/PaginacionComponent/PaginacionComponent";

function TablaGestionDocentes({
  docentes,
  onDocenteDeleted,
  onDocenteUpdated,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  //cambios paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24);
  const indexOfLastItem = currentPage * itemsPerPage;
  console.log(currentPage, itemsPerPage);
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = docentes.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  console.log(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);

  const handleDeleteClick = (docenteId) => {
    setSelectedDocente(docenteId);
    setShowDeleteModal(true);
  };

  const handleEditClick = (docente) => {
    setSelectedDocente(docente);
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    try {
      await DocenteService.deleteProfesor(selectedDocente);
      onDocenteDeleted(selectedDocente);
      showConfirmationMessage("Docente eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar:", error);
      showConfirmationMessage("Error al eliminar el docente");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await DocenteService.AdminUpdateProfesor(
        selectedDocente.usuarioId,
        updatedData
      );
      onDocenteUpdated(response.data);
      showConfirmationMessage("Docente actualizado correctamente");
    } catch (error) {
      console.error("Error en la actualización:", error);
      showConfirmationMessage("El DNI proporcionado ya existe");
    } finally {
      setShowEditModal(false);
    }
  };

  const showConfirmationMessage = (message) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 1700);
  };

  console.log(docentes)
  return (
    <div className="TablaGestionDocentesContainer">
      <ConfirmationModal
        show={showConfirmation}
        message={confirmationMessage}
      />

      {docentes.length === 0 ? (
        <div className="TablaGestionDocentesVerDocEmpty">
          <h3>No hay Docentes registrados</h3>
        </div>
      ) : (
        <div>
        <table className="TableGestionDocentes">
          <thead>
            <tr>
              <th>Dni</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Especialidad</th>
              <th>Codigo</th>
              <th>Celular</th>
              <th>Nivel</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((docente) => (
              <tr key={docente.usuarioId}>
                <td data-label="Dni">{docente.dni}</td>
                <td data-label="Nombres">{docente.nombre}</td>
                <td data-label="Apellidos">{docente.apellido}</td>
                <td data-label="Especialidad">{docente.especialidad}</td>
                <td data-label="Codigo">{docente.codigo}</td>
                <td data-label="Celular">{docente.telefono}</td>
                <td data-label="Nivel">{docente.nivel}</td>
                <td data-label="Editar">
                  <PrimaryButton
                    onClick={() => handleEditClick(docente)}
                    nombre="Editar"
                  />
                </td>
                <td data-label="Eliminar">
                  <PrimaryButton
                    onClick={() => handleDeleteClick(docente.usuarioId)}
                    nombre="Eliminar"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginacionComponent
        totalItems={docentes.length}
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

      <EditDocenteModal
        show={showEditModal}
        profesor={selectedDocente} 
        onUpdate={handleUpdate}
        onClose={() => setShowEditModal(false)}
      />
    </div>
  );
}

export default TablaGestionDocentes;
