import React, { useState } from "react";
import "./FormularioAgregarEstudiante.css";
import ButtonSubmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import { LiaIdCardSolid } from "react-icons/lia";
import { TbUserEdit } from "react-icons/tb";
import { FiSmartphone } from "react-icons/fi";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import AlumnoService from "../../../../services/alumnoService"; // Importa el servicio
import ConfirmationModal from "../../Modals/ConfirmacionModal"; // Importa el modal de confirmación
import { FaBirthdayCake } from "react-icons/fa";

function FormularioAgregarEstudiante({ onStudentAdded }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    grado: "1",
    nivel: "",
    fechaNacimiento: ""
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const optionsNivel = [                { value: "SELECCIONAR", label: "Seleccionar Nivel" },
    { value: "PRIMARIA", label: "Primaria" },
    { value: "SECUNDARIA", label: "Secundaria" },];
  const optionsGradoPrimaria = ["1", "2", "3", "4", "5", "6"];
  const optionsGradoSecundaria = ["1", "2", "3", "4", "5"];

  const getOptionsGrado = () => {
    return formData.nivel === "PRIMARIA" ? optionsGradoPrimaria : optionsGradoSecundaria;
  };

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
    if (!/^\d{8}$/.test(formData.dni)) {
      showErrorMessage("dni", "El DNI debe tener 8 dígitos");
      return;
    }
    if (!/^9\d{8}$/.test(formData.telefono)) {
      showErrorMessage("telefono", "El celular debe ser válido");
      return;
    }

    try {
      await AlumnoService.createAlumno(formData);
      showConfirmationMessage("Alumno agregado correctamente", 1500);
      setTimeout(() => {
        setFormData({
          nombre: "",
          apellido: "",
          dni: "",
          telefono: "",
          grado: "",
          nivel: "",
          fechaNacimiento: ""
        });
        onStudentAdded();
      }, 1500); 
    } catch (error) {
      console.error("Error al agregar estudiante:", error);
      showConfirmationMessage("El DNI ya existe ", 1500);
    }
  };

  return (
    <div className="FormularioAgregarEstudianteContainer">
      <ConfirmationModal show={showConfirmation} message={confirmationMessage} />
  
      <form onSubmit={handleSubmit}>
        <h3>Agregar Estudiante:</h3>
        <div className="FormularioAgregarEstudianteContentPrin">
          
          <div className="label-input-container-estudiantes">
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
  
          <div className="label-input-container-estudiantes">
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
  
          <div className="label-input-container-estudiantes">
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
  
          <div className="label-input-container-estudiantes">
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
  
          <div className="label-input-container-estudiantes">
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
  
          <div className="label-input-container-estudiantes">
            <div className="label-input-wrapper">
              <label htmlFor="grado">Grado:</label>
              <SelectComponent
                name="grado"
                options={getOptionsGrado()}
                value={formData.grado}
                onChange={handleChange}
              />
            </div>
          </div>
  
          <div className="label-input-container-estudiantes">
            <div className="label-input-wrapper">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
              <InputComponent
                nombre="fechaNacimiento"
                placeholder="Seleccione Fecha"
                type="date"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                icon={<FaBirthdayCake/>}
              />
            </div>
          </div>
        </div>
  
        <div className="butonSubmitEstudiantesContainer">
          <ButtonSubmit className="buttonSubmitEstudiantes" nombre="Agregar" />
        </div>
      </form>
    </div>
  );
}

export default FormularioAgregarEstudiante;