import React, { useState } from "react";
import HorarioService from "../../../../services/horarioService";
import InputComponent from "../../InputComponent/InputComponent";
import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import ButtonSubtmit from "../../ButtonSubmit/ButtonSubtmit";
import './SubirHorarioDocenteModal.css'

function SubirHorarioDocenteModal({ show, docente, onClose }) {
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivo) {
      setMensaje("Por favor, selecciona un archivo.");
      return;
    }

    try {
      await HorarioService.subirHorarioProfesor(docente.usuarioId, archivo);
      setMensaje("Horario subido correctamente.");
      if (onHorarioAgregado) {
        onHorarioAgregado();
      }

    } catch (error) {
      setMensaje("Error al subir el horario.");
    }
  };

  if (!show) return null;

  return (
    <div className="SubirHorarioModal">
      <div className="SubirHorarioModalContent">
        <h3>Subir Horario para {docente?.nombre} {docente?.apellido}</h3>
        <form onSubmit={handleSubmit}>
            <InputComponent type={"file"} onChange={handleFileChange}/>
            <ButtonSubtmit nombre={"Subir"}/>
        </form>
        {mensaje && <p>{mensaje}</p>}
        <PrimaryButton onClick={onClose} nombre={"Cerrar"}/>
      </div>
    </div>
  );
}

export default SubirHorarioDocenteModal;