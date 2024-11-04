import React, { useState } from 'react'
import PrimaryButton from '../../../generalsComponets/PrimaryButton/PrimaryButton'
import AsignarDocenteModal from '../../ModalsCurso/AsignarDocenteModal/AsignarDocenteModal';
import ConfirmationModal from "../../../VGestionUsuarios/Modals/ConfirmacionModal";
import './TablaAsignacionSubCurso.css'

function TablaAsignacionSubCurso({subcursos}) {
    console.log(subcursos)
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSubcurso, setSelectedSubcurso] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const handleEditClick = (subcurso) => {
        setSelectedSubcurso(subcurso);
        setShowEditModal(true);
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
    <div className='TablaAsignacionSubCursoContainer'>
        <ConfirmationModal show={showConfirmation} message={confirmationMessage} />
         {subcursos.length === 0 ? (
                <div className="TablaAsignacionSubCursoEmpty">
                    <h3>No hay Subcursos registrados</h3>
                </div>
            ) : (
                <table className="TableGestionSubCursos">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Nivel</th>
                            <th>Curso</th>
                            <th>Asignar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcursos.map((subcurso) => (
                            <tr key={subcurso.subcursoId}>
                                <td>{subcurso.nombre}</td>
                                <td>{subcurso.nivel}</td>
                                <td>{subcurso.curso.nombre}</td>
                                <td>
                                    <PrimaryButton nombre="Asignar"  onClick={() => handleEditClick(subcurso)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <AsignarDocenteModal
                show={showEditModal}
                curso={selectedSubcurso}
                onUpdate={handleUpdate}
                onClose={() => setShowEditModal(false)}
            />
    </div>
  )
}

export default TablaAsignacionSubCurso