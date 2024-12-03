import React, { useState } from "react";
import "./FormularioAgregarCurso.css";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import { RiBook2Line } from "react-icons/ri";
import TextAreaComponent from "../../../generalsComponets/TextAreaComponent/TextAreaComponent";
import { HiOutlinePencilAlt } from "react-icons/hi";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import ButtonSubtmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import CursoService from "../../../../services/cursosService";
import ConfirmationModal from "../../../VGestionUsuarios/Modals/ConfirmacionModal";

function FormularioAgregarCurso({ onCourseAdded }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    nivel: "",
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const nivelOptions = [
    { value: "SELECCIONAR", label: "Seleccionar Nivel" },
    { value: "PRIMARIA", label: "Primaria" },
    { value: "SECUNDARIA", label: "Secundaria" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showErrorMessage = (field, message) => {
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: message }));
    setTimeout(() => {
      setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }, 1300);
  };

  const showConfirmationMessage = (message, duration = 2000) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      showErrorMessage("nombre", "El nombre es obligatorio");
      return;
    }
    if (!formData.descripcion.trim()) {
      showErrorMessage("descripcion", "La descripción es obligatoria");
      return;
    }
    if (formData.nivel === "" || formData.nivel === "SELECCIONAR") {
      showErrorMessage("nivel", "Debe seleccionar un nivel");
      return;
    }

    try {
      await CursoService.createCurso(formData); // Usar el servicio adecuado para agregar curso
      showConfirmationMessage("Curso agregado correctamente", 2000);
      setTimeout(() => {
        setFormData({
          nombre: "",
          descripcion: "",
          nivel: "",
        });
        onCourseAdded(); // Llama a una función para refrescar la lista de cursos
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Mensaje personalizado con los valores de formData
        showConfirmationMessage(
          `Ya existe un curso con el nombre "${formData.nombre}" en el nivel "${formData.nivel}"`
        );
      } else {
        showConfirmationMessage("Error al crear el curso");
      }
    }
  };

  return (
    <div className="FormularioAgregarCursoContainer">
      <ConfirmationModal
        show={showConfirmation}
        message={confirmationMessage}
      />

      <form onSubmit={handleSubmit}>
        <h3>Agregar Curso</h3>
        <div className="formularioAgregarCursoContentPrin">
          {/* Contenedor para "Nombre" y "Nivel" en una sola fila */}
          <div className="label-input-row">
            <div className="label-input-container">
              <label htmlFor="nombre">Nombre:</label>
              <InputComponent
                nombre="nombre"
                placeholder="Nombre"
                icon={<RiBook2Line />}
                type="text"
                value={formData.nombre}
                onChange={handleChange}
              />
              {errorMessages.nombre && (
                <p className="error-message">{errorMessages.nombre}</p>
              )}
            </div>

            <div className="label-input-container">
              <label htmlFor="nivel">Nivel:</label>
              <SelectComponent
                name="nivel"
                options={nivelOptions}
                value={formData.nivel}
                onChange={handleChange}
              />
              {errorMessages.nivel && (
                <p className="error-message">{errorMessages.nivel}</p>
              )}
            </div>
          </div>

          {/* Descripción en una fila completa */}
          <div className="label-input-container">
            <label htmlFor="descripcion">Descripción:</label>
            <TextAreaComponent
              nombre="descripcion"
              placeholder="Descripción"
              icon={<HiOutlinePencilAlt />}
              value={formData.descripcion}
              onChange={handleChange}
            />
            {errorMessages.descripcion && (
              <p className="error-message">{errorMessages.descripcion}</p>
            )}
          </div>
        </div>

        <div className="buttonSubmitCursoContainer">
          <ButtonSubtmit className="buttonSubmitCurso" nombre="Agregar" />
        </div>
      </form>
    </div>
  );
}

export default FormularioAgregarCurso;
