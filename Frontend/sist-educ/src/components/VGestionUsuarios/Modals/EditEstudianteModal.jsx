import React, { useState, useEffect } from "react";
import "./EditEstudianteModal.css";
import InputComponent from "../../generalsComponets/InputComponent/InputComponent";
import { LiaIdCardSolid } from "react-icons/lia";
import { TbUserEdit } from "react-icons/tb";
import { FiSmartphone } from "react-icons/fi";
import { FaBirthdayCake } from "react-icons/fa";
import ButtonSubmit from "../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import ConfirmationModal from "./ConfirmacionModal"

function EditEstudianteModal({ show, student, onUpdate, onClose }) {
    const [formData, setFormData] = useState({
        dni: "",
        nombre: "",
        apellido: "",
        telefono: "",
        fechaNacimiento: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        if (student) {
            setFormData({
                dni: student.dni,
                nombre: student.nombre,
                apellido: student.apellido,
                telefono: student.telefono,
                fechaNacimiento: student.fechaNacimiento ? student.fechaNacimiento.slice(0, 10) : "",
                password: "",
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleNumberInput = (e) => {
        const { name, value, maxLength } = e.target;
        if (/^\d*$/.test(value) && value.length <= maxLength) {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const validateFields = () => {
        const errors = {};
        if (!formData.nombre.trim()) {
            errors.nombre = "El nombre es obligatorio";
        }
        if (!formData.apellido.trim()) {
            errors.apellido = "El apellido es obligatorio";
        }
        if (!/^9\d{8}$/.test(formData.telefono)) {
            errors.telefono = "El número de teléfono debe ser válido";
        }
        setErrors(errors);

        // Borrar errores después de 1300 ms
        setTimeout(() => {
            setErrors({});
        }, 1300);

        return Object.keys(errors).length === 0;
    };

    const showConfirmationMessage = (message, duration = 1700) => {
        setConfirmationMessage(message);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), duration);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;
    
        // Usa el valor en el formato yyyy-MM-dd directamente sin convertirlo a UTC
        const updatedFormData = {
            ...formData,
            fechaNacimiento: formData.fechaNacimiento,
        };

        try {
            await onUpdate(updatedFormData);
            showConfirmationMessage("Alumno actualizado correctamente");
            onClose();
        } catch (error) {
            console.error("Error en la actualización:", error);
            showConfirmationMessage("El DNI proporcionado ya existe");
        }
    };

    if (!show) return null;

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal-content">
                <button onClick={onClose} className="edit-close-button">✕</button>
                <h4>Recuerde modificar estos datos SOLO en casos especiales</h4>
                <br />

                <ConfirmationModal show={showConfirmation} message={confirmationMessage} />

                <form onSubmit={handleSubmit} className="edit-form-container">
                    <div className="label-input-container">
                        <label>DNI:</label>
                        <InputComponent
                            nombre="dni"
                            placeholder="Ingrese DNI"
                            icon={<LiaIdCardSolid />}
                            type="text"
                            value={formData.dni}
                            onChange={handleNumberInput}
                            maxLength="8"
                        />
                    </div>

                    <div className="label-input-container">
                        <label>Nombres:</label>
                        <InputComponent
                            nombre="nombre"
                            placeholder="Ingrese Nombre"
                            icon={<TbUserEdit />}
                            type="text"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                        {errors.nombre && <p className="error-message">{errors.nombre}</p>}
                    </div>

                    <div className="label-input-container">
                        <label>Apellidos:</label>
                        <InputComponent
                            nombre="apellido"
                            placeholder="Ingrese Apellido"
                            icon={<TbUserEdit />}
                            type="text"
                            value={formData.apellido}
                            onChange={handleChange}
                        />
                        {errors.apellido && <p className="error-message">{errors.apellido}</p>}
                    </div>

                    <div className="label-input-container">
                        <label>Celular:</label>
                        <InputComponent
                            nombre="telefono"
                            placeholder="Ingrese Celular"
                            icon={<FiSmartphone />}
                            type="text"
                            value={formData.telefono}
                            onChange={handleNumberInput}
                            maxLength="9"
                        />
                        {errors.telefono && <p className="error-message">{errors.telefono}</p>}
                    </div>

                    <div className="label-input-container">
                        <label>Fecha de Nacimiento:</label>
                        <InputComponent
                            nombre="fechaNacimiento"
                            placeholder="Seleccione Fecha"
                            icon={<FaBirthdayCake />}
                            type="date"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="label-input-container">
                        <label>Contraseña:</label>
                        <InputComponent
                            nombre="password"
                            placeholder="Ingrese nueva contraseña"
                            icon={<TbUserEdit />}
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="edit-button-container">
                        <ButtonSubmit className="edit-update-button" nombre="Actualizar" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEstudianteModal;