import React from "react";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import PrimaryButtonLarge from "../PrimaryButtonLarge/PrimaryButtonLarge";
import "./ComBoxElementTareaSubir.css";

function ComBoxElementTareaSubir({ cursoinfo }) {
  const [mostrarOtroComponente, setMostrarOtroComponente] = useState(false);
  const handleClick = () => {
    setMostrarOtroComponente(!mostrarOtroComponente);
  };
  return (
    <div className="ComBoxElementTareaSubirGeneralContainer">
      <div className="ComBoxElementTareaSubirContainer " onClick={handleClick}>
        <div className="FaFileUploadContainerTarea">
          <FaFileUpload />
        </div>
        <p className="PMd">Subir Tarea</p>
      </div>
      {mostrarOtroComponente && (
        <div className="ComBoxElementTareaSubirFormSubida">
          <form action="">
            <div className="FormTareaSubConSecContainer">
              <label htmlFor="NombreContenido">Nombre del contenido:</label>
              <input
                type="text"
                name="NombreContenido"
                id="NombreContenido"
                required
              />
            </div>
            <div className="FormTareaSubConTerContainer">
              <label htmlFor="DescripcionDelContenido">
                Descripcion del Contenido:
              </label>
              <textarea
                name="DescripcionDelContenido"
                id="DescripcionDelContenido"
                required
              />
            </div>
            <div className="FormTareaSubConSecContainer">
              <div className="FormTareaSubConSecSubContainer">
                <label htmlFor="SubirArchivo">Subir Archivo:</label>
                <input
                  type="file"
                  name="SubirArchivo"
                  id="SubirArchivo"
                  required
                />
              </div>
              <div className="FormTareaSubConSecSubContainer">
                <label htmlFor="FechaEntrega">Fecha de Entrega:</label>
                <input
                  type="date"
                  name="FechaEntrega"
                  id="FechaEntrega"
                  required
                />
              </div>
            </div>
            <div className="ButtonSubmitTareaSubir">
              <PrimaryButtonLarge nombre={"Subir"} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ComBoxElementTareaSubir;
