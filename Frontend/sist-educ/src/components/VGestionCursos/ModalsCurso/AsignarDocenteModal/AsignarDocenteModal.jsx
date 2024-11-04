import React, { useState, useEffect } from "react";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import ButtonSubtmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import { RiBook2Line } from "react-icons/ri";
import ConfirmationModal from "../../../VGestionUsuarios/Modals/ConfirmacionModal";
import { FaSchool } from "react-icons/fa";
import SearchComponent from "../../../generalsComponets/SearchComponent/SearchComponent";
import { TbUserEdit } from "react-icons/tb";
import "./AsignarDocenteModal.css";

function AsignarDocenteModal({ show, curso, onUpdate, onClose }) {
  const [nombre, setNombre] = useState(curso?.nombre || "");
  const [nivel, setNivel] = useState(curso?.nivel || "");
  const [cursobase, setCursoBase] = useState(curso?.curso.nombre || "");
  const [errorMessages, setErrorMessages] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

    let docente={
        nombre:"Armando Felipe",
        apellidos:"Vega Moreno",
    }

  useEffect(() => {
    if (curso) {
      setNombre(curso.nombre);
      setNivel(curso.nivel);
      setCursoBase(curso.curso.nombre)
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
    console.log(
      "Datos enviados al backend:",
      JSON.stringify(dataToSend, null, 2)
    );

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
    <div className="AsignarDocenteModalContainer">
      <div className="AsignarDocenteModalContent">
        <button onClick={onClose} className="AsignarDocenteModalCloseButton">
          ✕
        </button>
        <h4>Asignar Docente</h4>
        <ConfirmationModal
          show={showConfirmation}
          message={confirmationMessage}
        />
        <form className="AsignarDocenteModalForm" onSubmit={handleSave}>
        <div className="AsignarDocenteModalFormLabelInputRow">
            <div className="AsignarDocenteModalFormLabelInputContainer">
              <label htmlFor="nivel">Docente:</label>
                <SearchComponent nombre={"docente"} placeholder={"Buscar Docente"}/>
            </div>
            {errorMessages.nombre && (
              <p className="AsignarDocenteModalErrorMessage">
                {errorMessages.nombre}
              </p>
            )}
          </div>
          
          <div className="AsignarDocenteModalFormLabelInputRow">
            <div className="AsignarDocenteModalFormLabelInputContainer">
              <label htmlFor="nombre">Nombres Docente:</label>
              <InputComponent
                nombre="nombreDocente"
                placeholder="Nombres de Docente"
                icon={<TbUserEdit />}
                type="text"
                value={docente.nombre}
              />
            </div>
            {errorMessages.nombre && (
              <p className="AsignarDocenteModalErrorMessage">
                {errorMessages.nombre}
              </p>
            )}
          </div>

          <div className="AsignarDocenteModalFormLabelInputRow">
            <div className="AsignarDocenteModalFormLabelInputContainer">
              <label htmlFor="nombre">Apellidos Docente:</label>
              <InputComponent
                nombre="apellidoDocente"
                placeholder="Apellidos de Docente"
                icon={<TbUserEdit />}
                type="text"
                value={docente.apellidos}
              />
            </div>
            {errorMessages.nombre && (
              <p className="AsignarDocenteModalErrorMessage">
                {errorMessages.nombre}
              </p>
            )}
          </div>

          <div className="AsignarDocenteModalFormLabelInputRow">
            <div className="AsignarDocenteModalFormLabelInputContainer">
              <label htmlFor="nivel">Nivel:</label>
              <InputComponent
                nombre="nivel"
                placeholder="Nivel"
                icon={<FaSchool />}
                type="text"
                value={nivel}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            {errorMessages.nombre && (
              <p className="AsignarDocenteModalErrorMessage">
                {errorMessages.nombre}
              </p>
            )}
          </div>
          <div className="AsignarDocenteModalFormLabelInputRow">
            <div className="AsignarDocenteModalFormLabelInputContainer">
              <label htmlFor="nivel">Curso:</label>
              <InputComponent
                nombre="curso"
                placeholder="Curso"
                icon={<RiBook2Line />}
                type="text"
                value={cursobase}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            {errorMessages.nombre && (
              <p className="AsignarDocenteModalErrorMessage">
                {errorMessages.nombre}
              </p>
            )}
          </div>
          <div className="AsignarDocenteModalButtonContainer">
                        <ButtonSubtmit className="AsignarDocenteModalButtonSave" nombre="Guardar" />
                    </div>
        </form>
      </div>
    </div>
  );
}

export default AsignarDocenteModal;
