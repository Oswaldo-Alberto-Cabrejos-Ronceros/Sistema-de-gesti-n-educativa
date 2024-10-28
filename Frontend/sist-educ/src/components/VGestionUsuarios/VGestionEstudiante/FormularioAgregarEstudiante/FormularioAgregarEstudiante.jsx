import React, { useState } from "react";
import "./FormularioAgregarEstudiante.css";
import ButtonSubtmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import { LiaIdCardSolid } from "react-icons/lia";
import { TbUserEdit } from "react-icons/tb";
import { FiSmartphone } from "react-icons/fi";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import AlumnoService from "../../../../services/alumnoService"; // Importa el servicio

function FormularioAgregarEstudiante({ onStudentAdded }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    grado: "",
    nivel: "",
    fechaNacimiento: ""
  });

  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const optionsNivel = ["Seleccionar", "PRIMARIA", "SECUNDARIA"];
  const optionsGradoPrimaria = ["1", "2", "3", "4", "5", "6"];
  const optionsGradoSecundaria = ["1", "2", "3", "4", "5"];

  // Opciones dinámicas de grado según el nivel seleccionado
  const getOptionsGrado = () => {
    return formData.nivel === "PRIMARIA" ? optionsGradoPrimaria : optionsGradoSecundaria;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showModalMessage = (message, duration) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.nivel === "" || formData.nivel === "Seleccionar") {
      showModalMessage("Debe seleccionar un nivel", 1500);
      return;
    }
    if (!/^\d{8}$/.test(formData.dni)) {
      showModalMessage("El DNI ya existe o no contiene 8 dígitos", 1500);
      return;
    }

    try {
      await AlumnoService.createAlumno(formData);
      showModalMessage("Alumno agregado correctamente", 2000);
      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        grado: "",
        nivel: "",
        fechaNacimiento: ""
      });
      onStudentAdded(); // Llama a la función para actualizar la lista de estudiantes
    } catch (error) {
      console.error("Error al agregar estudiante:", error);
      showModalMessage("El DNI ya existe o no contiene 8 dígitos", 1500);
    }
  };

  return (
    <div className="FormularioAgregarEstudianteContainer">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h3>Agregar Estudiante:</h3>
        <div className="FormularioAgregarEstudianteContentPrin">
          <div className="label-input-container">
            <label htmlFor="dni">DNI:</label>
            <InputComponent
              nombre="dni"
              placeholder="Ingrese DNI"
              icon={<LiaIdCardSolid />}
              type="text"
              value={formData.dni}
              onChange={handleChange}
            />
          </div>
          <div className="label-input-container">
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
          <div className="label-input-container">
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
          <div className="label-input-container">
            <label htmlFor="telefono">Celular:</label>
            <InputComponent
              nombre="telefono"
              placeholder="Ingrese Celular"
              icon={<FiSmartphone />}
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="nivel">Nivel:</label>
            <SelectComponent
              name="nivel"
              options={optionsNivel}
              value={formData.nivel}
              onChange={handleChange}
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="grado">Grado:</label>
            <SelectComponent
              name="grado"
              options={getOptionsGrado()}
              value={formData.grado}
              onChange={handleChange}
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
            <InputComponent
              nombre="fechaNacimiento"
              placeholder="Seleccione Fecha"
              type="date"
              value={formData.fechaNacimiento}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="butonSubmitEstudiantesContainer">
          <ButtonSubtmit className="buttonSubmitEstudiantes" nombre="Agregar" />
        </div>
      </form>
    </div>
  );
}

export default FormularioAgregarEstudiante;