import React from "react";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import PrimaryButtonLarge from "../PrimaryButtonLarge/PrimaryButtonLarge";
import "./ComBoxElementCursoSubir.css";

function ComBoxElementCursoSubir({ cursoinfo }) {
  const [mostrarOtroComponente, setMostrarOtroComponente] = useState(false);

  const handleClick = () => {
    setMostrarOtroComponente(!mostrarOtroComponente);
  };
  return (
    <div className="ComBoxElementCursoDocSubirGeneralContainer">
      <div
        className="ComBoxElementCursoDocSubirContainer "
        onClick={handleClick}
      >
        <div className="FaFileUploadContainer">
          <FaFileUpload />
        </div>
        <p className="PMd">Subir Contenido</p>
      </div>
      {mostrarOtroComponente && (
        <div className="ComBoxElementCurSubirFormSubida">
          <form action="">
            <div className="FormSubConSecContainer">
              <label htmlFor="NombreContenido">Nombre del contenido:</label>
              <input
                type="text"
                name="NombreContenido"
                id="NombreContenido"
                required
              />
            </div>
            <div className="FormSubConTerContainer">
              <label htmlFor="DescripcionDelContenido">
                Descripcion del Contenido:
              </label>
              <textarea
                name="DescripcionDelContenido"
                id="DescripcionDelContenido"
                required
              />
            </div>
            <div className="FormSubConSecContainer">
                <label htmlFor="SubirArchivo">Subir Archivo:</label>
                <input
                  type="file"
                  name="SubirArchivo"
                  id="SubirArchivo"
                  required
                />
            </div>
            <div className="ButtonSubmitCursoSubir">
              <PrimaryButtonLarge nombre={"Subir"}/>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ComBoxElementCursoSubir;
