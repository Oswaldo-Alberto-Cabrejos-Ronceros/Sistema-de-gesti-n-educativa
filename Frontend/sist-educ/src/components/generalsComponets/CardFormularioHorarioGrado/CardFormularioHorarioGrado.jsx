import React, { useState } from "react";
import "./CardFormularioHorarioGrado.css";
import SelectComponent from "../SelectComponent/SelectComponent";
import InputComponent from "../InputComponent/InputComponent";
import { FaUpload } from "react-icons/fa6";
import ButtonSubtmit from "../ButtonSubmit/ButtonSubtmit";
import ConfirmationModal from "../../VGestionUsuarios/Modals/ConfirmacionModal";
import HorarioService from "../../../services/horarioService"; 

function CardFormularioHorarioGrado({ onAgregarHorario }) {
  const optionsNivel = ["SELECCIONAR", "PRIMARIA", "SECUNDARIA"];
  const optionsGradoPrimaria = ["1", "2", "3", "4", "5", "6"];
  const optionsGradoSecundaria = ["1", "2", "3", "4", "5"];
  const optionsSeccion = ["A", "B"];

  const [formData, setFormData] = useState({
    nivel: "",
    grado: "1",
    seccion: "A",
    horario: null,
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeHorario = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const getOptionsGrado = () => {
    return formData.nivel === "PRIMARIA" ? optionsGradoPrimaria : optionsGradoSecundaria;
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
    if (formData.horario === null) {
      showErrorMessage("horario", "Debe subir una imagen");
      return;
    }

    try {
      // Llamar al servicio para subir el horario
      await HorarioService.subirHorarioAlumno(formData.nivel, formData.grado,formData.seccion, formData.horario);
      showConfirmationMessage("Horario agregado correctamente", 1500);
      if (onAgregarHorario) {
        onAgregarHorario(formData);
      }
      // Resetear el formulario
      setTimeout(() => {
        setFormData({
          nivel: "",
          grado: "1",
          seccion:"A",
          horario: null,
        });
      }, 1500);
    } catch (error) {
      console.error("Error al agregar horario:", error);
      showErrorMessage("horario", "Error al subir el horario. Intente nuevamente.");
    }
  };

  return (
    <div className="CardFormularioHorarioGradoContainer">
      <ConfirmationModal show={showConfirmation} message={confirmationMessage} />
      <form onSubmit={handleSubmit}>
        <h3>Agregar Horario</h3>
        <div className="CardFormularioHorarioGradoContent">
          <div className="label-input-container">
            <label htmlFor="Nivel">Nivel</label>
            <SelectComponent
              name={"nivel"}
              options={optionsNivel}
              value={formData.nivel}
              onChange={handleChange}
            />
          </div>
          {errorMessages.nivel && <p className="error-message">{errorMessages.nivel}</p>}
          <div className="label-input-container">
            <label htmlFor="Grado">Grado</label>
            <SelectComponent
              name={"grado"}
              options={getOptionsGrado()}
              value={formData.grado}
              onChange={handleChange}
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="Seccion">Seccion</label>
            <SelectComponent name={"seccion"} options={optionsSeccion} value={formData.seccion} onChange={handleChange} />
          </div>
          <div className="label-input-container input-file">
            <label htmlFor="Imagen">Imagen</label>
            <InputComponent
              type={"file"}
              nombre={"horario"}
              icon={<FaUpload />}
              onChange={handleChangeHorario}
              accept="image/*"
            />
          </div>
          {errorMessages.horario && <p className="error-message">{errorMessages.horario}</p>}
        </div>
        <div className="buttonSubmitHorarioContainer">
          <ButtonSubtmit className="buttonSubmirHorario" nombre={"Agregar"} />
        </div>
      </form>
    </div>
  );
}

export default CardFormularioHorarioGrado;