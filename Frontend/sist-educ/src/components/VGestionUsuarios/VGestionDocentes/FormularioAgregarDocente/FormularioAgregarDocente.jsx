import React, { useState } from "react";
import DocenteService from "../../../../services/docenteService";
import "./FormularioAgregarDocente.css";
import ButtonSubmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import { LiaIdCardSolid } from "react-icons/lia";
import { TbUserEdit } from "react-icons/tb";
import { FiSmartphone } from "react-icons/fi";
import { GiDiploma } from "react-icons/gi";
import ConfirmationModal from "../../Modals/ConfirmacionModal";

function FormularioAgregarDocente({ onDocenteAdded }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    especialidad: "",
    nivel: "",
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const optionsNivel = [                { value: "SELECCIONAR", label: "Seleccionar Nivel" },
    { value: "PRIMARIA", label: "Primaria" },
    { value: "SECUNDARIA", label: "Secundaria" },];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberInput = (e) => {
    const { name, value, maxLength } = e.target;
    if (/^\d*$/.test(value) && value.length <= maxLength) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const showErrorMessage = (field, message) => {
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: message }));
    setTimeout(() => {
      setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }, 1300);
  };

  const showConfirmationMessage = (message, duration = 1500) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{8}$/.test(formData.dni)) {
      showErrorMessage("dni", "El DNI debe tener 8 dígitos");
      return;
    }
    if (formData.nivel === "" || formData.nivel === "SELECCIONAR") {
      showErrorMessage("nivel", "Debe seleccionar un nivel");
      return;
    }
    if (!formData.nombre.trim()) {
      showErrorMessage("nombre", "El nombre es obligatorio");
      return;
    }
    if (!formData.apellido.trim()) {
      showErrorMessage("apellido", "El apellido es obligatorio");
      return;
    }
    if (!/^9\d{8}$/.test(formData.telefono)) {
      showErrorMessage("telefono", "El celular debe ser válido");
      return;
    }
    if (!formData.especialidad.trim()) {
      showErrorMessage("especialidad", "Debe referenciar una especialidad");
      return;
    }

    try {
      await DocenteService.createProfesor(formData);
      showConfirmationMessage("Docente agregado exitosamente", 3000);
      setTimeout(() => {
      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        especialidad: "",
        nivel: "",
      });
      onDocenteAdded();
    }, 1500);
    } catch (error) {
      console.error("Error al agregar docente:", error);
      showErrorMessage("dni", "El DNI ya existe ");
    }
  };

  return (
    <div className="FormularioAgregarDocenteContainer">
      <ConfirmationModal show={showConfirmation} message={confirmationMessage} />
      <form onSubmit={handleSubmit}>
        <h3>Agregar Docente</h3>
        <div className="FormularioAgregarDocentesContentPrin">
          <div className="label-input-container-docentes">
            <div className="label-input-wrapper">
              <label htmlFor="dni">DNI:</label>
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
            {errorMessages.dni && <p className="error-message">{errorMessages.dni}</p>}
          </div>

          <div className="label-input-container-docentes">
            <div className="label-input-wrapper">
              <label htmlFor="apellido">Apellidos:</label>
              <InputComponent
                nombre="apellido"
                placeholder="Ingrese Apellidos"
                icon={<TbUserEdit />}
                type="text"
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>
            {errorMessages.apellido && <p className="error-message">{errorMessages.apellido}</p>}
          </div>

          <div className="label-input-container-docentes">
            <div className="label-input-wrapper">
              <label htmlFor="nombre">Nombres:</label>
              <InputComponent
                nombre="nombre"
                placeholder="Ingrese Nombres"
                icon={<TbUserEdit />}
                type="text"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            {errorMessages.nombre && <p className="error-message">{errorMessages.nombre}</p>}
          </div>

          <div className="label-input-container-docentes">
            <div className="label-input-wrapper">
              <label htmlFor="telefono">Celular:</label>
              <InputComponent
                nombre="telefono"
                placeholder="Ingrese Celular"
                icon={<FiSmartphone />}
                type="tel"
                value={formData.telefono}
                onChange={handleNumberInput}
                maxLength="9"
              />
            </div>
            {errorMessages.telefono && <p className="error-message">{errorMessages.telefono}</p>}
          </div>

          <div className="label-input-container-docentes">
            <div className="label-input-wrapper">
              <label htmlFor="especialidad">Especialidad:</label>
              <InputComponent
                nombre="especialidad"
                placeholder="Ingrese Especialidad"
                icon={<GiDiploma />}
                type="text"
                value={formData.especialidad}
                onChange={handleChange}
              />
            </div>
            {errorMessages.especialidad && <p className="error-message">{errorMessages.especialidad}</p>}
          </div>

          <div className="label-input-container-docentes">
            <div className="label-input-wrapper">
              <label htmlFor="nivel">Nivel:</label>
              <SelectComponent
                name="nivel"
                options={optionsNivel}
                value={formData.nivel}
                onChange={handleChange}
              />
            </div>
            {errorMessages.nivel && <p className="error-message">{errorMessages.nivel}</p>}
          </div>
        </div>

        <div className="butonSubmitDocentesContainer">
          <ButtonSubmit className="buttonSubmitDocentes" nombre="Agregar" />
        </div>
      </form>
    </div>
  );
}

export default FormularioAgregarDocente;