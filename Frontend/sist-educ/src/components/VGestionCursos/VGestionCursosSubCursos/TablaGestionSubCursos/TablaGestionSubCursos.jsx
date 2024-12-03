import React, { useState } from "react";
import './TablaGestionSubCursos.css'
import PrimaryButton from '../../../generalsComponets/PrimaryButton/PrimaryButton';
import ConfirmationModal from "../../../VGestionUsuarios/Modals/ConfirmacionModal";
import EditGestionCursosModal from "../../ModalsCurso/EditGestionCursosModal/EditGestionCursosModal";
import EliminarAsignacionModal from "../../ModalsCurso/EliminarAsignacionModal/EliminarAsignacionModal";
import SubcursoService from "../../../../services/subcursoService";

function TablaGestionSubCursos({ subcursos, onSubCursoUpdated, onSubCursoDeleted }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSubcurso, setSelectedSubcurso] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleEditClick = (subcurso) => {
        setSelectedSubcurso(subcurso);
        setShowEditModal(true);
    };

    const handleDeleteClick = (subcursoId) => {
        setSelectedSubcurso(subcursoId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await SubcursoService.deleteSubcurso(selectedSubcurso);
            onSubCursoDeleted(selectedSubcurso);
            showConfirmationMessage("Subcurso eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar el subcurso:", error);
            showConfirmationMessage("Error al eliminar el subcurso");
        } finally {
            setShowDeleteModal(false);
        }
    };

    const handleUpdate = async (updatedData) => {
        try {
            const response = await SubcursoService.SubcursoUpdate(selectedSubcurso.subcursoId, updatedData);
            onSubCursoUpdated(response.data);
            showConfirmationMessage("Subcurso actualizado correctamente");
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

    const showConfirmationMessage = (message, duration = 1500) => {
        setConfirmationMessage(message);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), duration);
    };

    return (
        <div className="TablaGestionSubCursosContainer">
            <ConfirmationModal show={showConfirmation} message={confirmationMessage} />

            {subcursos.length === 0 ? (
                <div className="TablaGestionSubCursosVerDocEmpty">
                    <h3>No hay Subcursos registrados</h3>
                </div>
            ) : (
                <table className="TableGestionSubCursos">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Nivel</th>
                            <th>Curso</th>
                            <th>Modificar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcursos.map((subcurso) => (
                            <tr key={subcurso.subcursoId}>
                                <td data-label="Nombre">{subcurso.nombre}</td>
                                <td data-label="Descripcion">{subcurso.descripcion}</td>
                                <td data-label="Nivel">{subcurso.nivel}</td>
                                <td data-label="Curso">{subcurso.curso.nombre}</td>
                                <td data-label="Modificar">
                                    <PrimaryButton nombre="Editar" onClick={() => handleEditClick(subcurso)} />
                                </td>
                                <td data-label="Eliminar">
                                    <PrimaryButton nombre="Eliminar" onClick={() => handleDeleteClick(subcurso.subcursoId)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <EditGestionCursosModal
                show={showEditModal}
                curso={selectedSubcurso}
                onUpdate={handleUpdate}
                onClose={() => setShowEditModal(false)}
            />

            <EliminarAsignacionModal
                show={showDeleteModal}
                message={`¿Estás seguro de que deseas eliminar este Subcurso ?`}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </div>
    );
}

export default TablaGestionSubCursos;