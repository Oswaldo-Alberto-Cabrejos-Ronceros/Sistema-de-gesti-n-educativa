import React, { useState } from "react";
import "./TablaGestionCursos.css";
import PrimaryButton from "../../../generalsComponets/PrimaryButton/PrimaryButton";
import ConfirmationModal from "../../../VGestionUsuarios/Modals/ConfirmacionModal";
import EditGestionCursosModal from "../../ModalsCurso/EditGestionCursosModal/EditGestionCursosModal";
import EliminarAsignacionModal from "../../ModalsCurso/EliminarAsignacionModal/EliminarAsignacionModal";
import CursoService from "../../../../services/cursosService";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";

function TablaGestionCursos({ cursos, onCourseUpdated, onCourseDeleted }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedSubcursos, setSelectedSubcursos] = useState({});

  const handleEditClick = (curso) => {
    setSelectedCurso(curso);
    setShowEditModal(true);
  };

  const handleDeleteClick = (cursoId) => {
    setSelectedCurso(cursoId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await CursoService.deleteCurso(selectedCurso);
      onCourseDeleted(selectedCurso);
      showConfirmationMessage("Curso eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      showConfirmationMessage("Error al eliminar el curso");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await CursoService.updateCurso(selectedCurso.cursoId, updatedData);
      onCourseUpdated(response.data); // Usa onCourseUpdated para actualizar el curso específico
      showConfirmationMessage("Curso actualizado correctamente");
    } catch (error) {
      console.error("Error en la actualización:", error);
        if (error.response && error.response.status === 500) {
            showConfirmationMessage(
                `Ya existe un subcurso con el nombre "${updatedData.nombre}" , verifique el nivel"`
            );
        } else {
            showConfirmationMessage("Error al actualizar el subcurso");
        }
    } finally {
      setShowEditModal(false);
    }
  };

  const showConfirmationMessage = (message) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 1700);
  };

  const handleSubcursoSelect = (cursoId, subcursoId) => {
    setSelectedSubcursos((prevSelections) => ({
      ...prevSelections,
      [cursoId]: subcursoId,
    }));
  };



  return (
    <div className="TablaGestionCursosContainer">
      <ConfirmationModal show={showConfirmation} message={confirmationMessage} />

      {cursos.length === 0 ? (
        <div className="TablaGestionCursosVerDocEmpty">
          <h3>No hay Cursos registrados</h3>
        </div>
      ) : (
        <table className="TableGestionCursos">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Nivel</th>
              <th>SubCursos</th>
              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.cursoId}> {/* Clave única aquí */}
                <td data-label="Nombre">{curso.nombre}</td>
                <td data-label="Descripcion">{curso.descripcion}</td>
                <td data-label="Nivel">{curso.nivel}</td>
                <td data-label="Subcursos">
                  <SelectComponent
                    name={`subcursos-${curso.cursoId}`}
                    options={
                      curso.subcursos && curso.subcursos.length > 0
                        ? curso.subcursos.map((subcurso) => ({
                          label: subcurso.nombre,
                          value: subcurso.subcursoId,
                          key: subcurso.subcursoId, // Clave única aquí
                        }))
                        : [{ label: "Sin subcursos", value: "" }]
                    }
                    value={selectedSubcursos[curso.cursoId] || ""}
                    onChange={(e) =>
                      handleSubcursoSelect(curso.cursoId, e.target.value)
                    }
                  />
                </td>
                <td data-label="Modificar">
                  <PrimaryButton nombre="Editar" onClick={() => handleEditClick(curso)} />
                </td>
                <td data-label="Eliminar">
                  <PrimaryButton nombre="Eliminar" onClick={() => handleDeleteClick(curso.cursoId)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <EditGestionCursosModal
        show={showEditModal}
        curso={selectedCurso}
        onUpdate={handleUpdate}
        onClose={() => setShowEditModal(false)}
      />

      <EliminarAsignacionModal
        show={showDeleteModal}
        message={`¿Estás seguro de que deseas eliminar este curso ?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>


  );
}

export default TablaGestionCursos;