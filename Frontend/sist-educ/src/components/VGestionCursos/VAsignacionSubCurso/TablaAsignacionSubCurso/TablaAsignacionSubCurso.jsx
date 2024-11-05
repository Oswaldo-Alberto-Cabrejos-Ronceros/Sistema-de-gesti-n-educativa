import React, { useState } from 'react'
import PrimaryButton from '../../../generalsComponets/PrimaryButton/PrimaryButton'
import AsignarDocenteModal from '../../ModalsCurso/AsignarDocenteModal/AsignarDocenteModal';
import DeleteUserModal from "../../../VGestionUsuarios/Modals/DeleteUserModal";
import SelectComponent from '../../../generalsComponets/SelectComponent/SelectComponent';
import DocenteService from "../../../../services/docenteService"
import './TablaAsignacionSubCurso.css'

function TablaAsignacionSubCurso({ docentes = [], onDocenteUpdated, onShowConfirmation }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDocente, setSelectedDocente] = useState(null);
    const [selectedAsignacionId, setSelectedAsignacionId] = useState(null);

    const handleEditClick = (docente) => {
        setSelectedDocente(docente);
        setShowEditModal(true);
    };

    const handleDeleteClick = (asignacionId) => {
        setSelectedAsignacionId(asignacionId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await DocenteService.desasignarProfesor(selectedAsignacionId);
            onShowConfirmation("Asignación eliminada correctamente");
            onDocenteUpdated(); // Actualiza la lista de docentes después de eliminar la asignación
        } catch (error) {
            console.error("Error al eliminar la asignación:", error);
            onShowConfirmation("Error al eliminar la asignación");
        } finally {
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="TablaAsignacionSubCursoContainer">
            {docentes.length === 0 ? (
                <div className="TablaAsignacionSubCursoEmpty">
                    <h3>No hay docentes registrados</h3>
                </div>
            ) : (
                <table className="TableGestionSubCursos">
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Nivel</th>
                            <th>Especialidad</th>
                            <th>Cursos Asignados</th>
                            <th>Estado</th>
                            <th>Asignar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docentes.map((docente) => (
                            <tr key={docente.usuarioId}>
                                <td>{docente.nombre}</td>
                                <td>{docente.apellido}</td>
                                <td>{docente.nivel}</td>
                                <td>{docente.especialidad}</td>
                                <td>
                                    <SelectComponent
                                        name={`subcursos-${docente.usuarioId}`}
                                        options={docente.asignacionProfesor.map((asignacion) => ({
                                            label: asignacion.subcurso.nombre,
                                            value: asignacion.subcurso.subcursoId,
                                        }))}
                                        value={null}
                                        onChange={null}
                                    />
                                </td>
                                <td>
                                    {docente.asignacionProfesor.length > 0 && docente.asignacionProfesor[0].estado}
                                </td>
                                <td>
                                    <PrimaryButton nombre="Asignar" onClick={() => handleEditClick(docente)} />
                                </td>
                                <td>
                                    {docente.asignacionProfesor.length > 0 && (
                                        <PrimaryButton
                                            nombre="Eliminar"
                                            onClick={() => handleDeleteClick(docente.asignacionProfesor[0].asignacionProfesorId)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <AsignarDocenteModal
                show={showEditModal}
                docente={selectedDocente}
                onClose={() => setShowEditModal(false)}
                onDocenteUpdated={onDocenteUpdated}
                onShowConfirmation={onShowConfirmation}
            />

            <DeleteUserModal
                show={showDeleteModal}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </div>
    );
}

export default TablaAsignacionSubCurso;