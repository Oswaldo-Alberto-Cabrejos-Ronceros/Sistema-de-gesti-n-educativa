import React, { useState, useEffect } from "react";
import "./EditGestionCursosModal.css";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import TextAreaComponent from "../../../generalsComponets/TextAreaComponent/TextAreaComponent";
import ButtonSubmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import { RiBook2Line } from "react-icons/ri";
import { HiOutlinePencilAlt } from "react-icons/hi";
import ConfirmationModal from "../../../VGestionUsuarios/Modals/ConfirmacionModal";

function EditGestionCursosModal({ show, curso, onUpdate, onClose }) {
    const [nombre, setNombre] = useState(curso?.nombre || "");
    const [descripcion, setDescripcion] = useState(curso?.descripcion || "");
    const [errorMessages, setErrorMessages] = useState({});
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        if (curso) {
            setNombre(curso.nombre);
            setDescripcion(curso.descripcion);
        }
    }, [curso]);

    const handleSave = (event) => {
        event.preventDefault();

        const errors = {};
        if (!nombre.trim()) {
            errors.nombre = "El nombre es obligatorio";
        }
        if (!descripcion.trim()) {
            errors.descripcion = "La descripción es obligatorio";
        }

        setErrorMessages(errors);

        // Borra los mensajes de error después de 1.5 segundos
        if (Object.keys(errors).length > 0) {
            setTimeout(() => {
                setErrorMessages({});
            }, 1500);
            return;
        }

        const dataToSend = { nombre: nombre, descripcion };

        onUpdate(dataToSend);
        showConfirmationMessage("Curso actualizado correctamente");
        onClose();
    };

    const showConfirmationMessage = (message, duration = 1500) => {
        setConfirmationMessage(message);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), duration);
    };

    if (!show) return null;

    return (
        <div className="editGestionCursos-modal-overlay">
            <div className="editGestionCursos-modal-content">
                <button onClick={onClose} className="editGestionCursos-close-button">✕</button>
                <h4>Editar Curso</h4>

                <ConfirmationModal show={showConfirmation} message={confirmationMessage} />

                <form className="editGestionCursos-form-container" onSubmit={handleSave}>
                    <div className="editGestionCursos-label-input-row">
                        <div className="editGestionCursos-label-input-container">
                            <label htmlFor="nombre">Nombre:</label>
                            <InputComponent
                                nombre="nombre"
                                placeholder="Nombre"
                                icon={<RiBook2Line />}
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        {errorMessages.nombre && (
                            <p className="editGestionCursos-error-message">{errorMessages.nombre}</p>
                        )}
                    </div>

                    <div className="editGestionCursos-label-input-row">
                        <div className="editGestionCursos-label-input-container">
                            <label htmlFor="descripcion">Descripción:</label>
                            <TextAreaComponent
                                nombre="descripcion"
                                placeholder="Descripción"
                                icon={<HiOutlinePencilAlt />}
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>
                        {errorMessages.descripcion && (
                            <p className="editGestionCursos-error-message">{errorMessages.descripcion}</p>
                        )}
                    </div>

                    <div className="editGestionCursos-button-container">
                        <ButtonSubmit className="editGestionCursos-buttonSave" nombre="Guardar" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditGestionCursosModal;