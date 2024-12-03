import React from "react";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import PrimaryButtonLarge from "../PrimaryButtonLarge/PrimaryButtonLarge";
import "./ComBoxElementCursoSubir.css";
import ConfirmationModal from "../../VGestionUsuarios/Modals/ConfirmacionModal";
import contenidosService from "../../../services/contenidosService";

function ComBoxElementCursoSubir({ cursoinfo, unidad, onAgregarContenido }) {
  const [mostrarOtroComponente, setMostrarOtroComponente] = useState(false);

  const handleClick = () => {
    setMostrarOtroComponente(!mostrarOtroComponente);
  };

  const [formData, setFormData] = useState({
    subcursoId: cursoinfo.SubcursoId,
    nivel: cursoinfo.Nivel,
    grado: cursoinfo.Grado,
    unidad: unidad,
    nombreContenido: "",
    descripcionContenido: "",
    isTarea: false,
    archivo: null,
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleChangeArchivo = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
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
    if (formData.horario === null) {
      showErrorMessage("archivo", "Debe subir un archivo");
      return;
    }
    if (formData.nombreContenido === "") {
      showErrorMessage(
        "nombreContenido",
        "Debe enviar el nombre del contenido"
      );
      return;
    }
    if (formData.descripcionContenido === "") {
      showErrorMessage(
        "descripcionContenido",
        "Debe enviar la descripcion del contenido"
      );
      return;
    }
    try {
      //llamar a contenidosServices
      const nuevoContenido = await contenidosService.subirContenido(
        formData.subcursoId,
        formData.nivel,
        formData.grado,
        formData.unidad,
        formData.nombreContenido,
        formData.descripcionContenido,
        formData.isTarea,
        formData.archivo
      );
      showConfirmationMessage("Contenido agregado correctamente", 1500);
      onAgregarContenido(nuevoContenido.data);
      // Resetear el formulario
      showConfirmationMessage("Contenido subido correctamente", 1500);
      setTimeout(() => {
        setFormData({
          subcursoId: cursoinfo.SubcursoId,
          nivel: cursoinfo.Nivel,
          grado: cursoinfo.Grado,
          unidad: unidad,
          nombreContenido: "",
          descripcionContenido: "",
          isTarea: false,
          archivo: null,
        });
        setMostrarOtroComponente(false);
      }, 1500);
    } catch (error) {
      console.error("Error al agregar contenido:", error);
      showErrorMessage(
        "contenido",
        "Error al subir el contenido. Intente nuevamente."
      );
    }
  };

  return (
    <div className="ComBoxElementCursoDocSubirGeneralContainer">
      <ConfirmationModal
        show={showConfirmation}
        message={confirmationMessage}
      />
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
          <form onSubmit={handleSubmit}>
            <div className="FormSubConSecContainer">
              <label htmlFor="NombreContenido">Nombre del contenido:</label>
              <input
                type="text"
                name="nombreContenido"
                id="nombreContenido"
                required
                value={formData.nombreContenido}
                onChange={handleChange}
              />
            </div>
            {errorMessages.nombreContenido && (
              <p className="error-message">{errorMessages.nombreContenido}</p>
            )}
            <div className="FormSubConTerContainer">
              <label htmlFor="DescripcionDelContenido">
                Descripcion del Contenido:
              </label>
              <textarea
                name="descripcionContenido"
                id="descripcionContenido"
                required
                value={formData.descripcionContenido}
                onChange={handleChange}
              />
            </div>
            {errorMessages.descripcionContenido && (
              <p className="error-message">
                {errorMessages.descripcionContenido}
              </p>
            )}
            <div className="FormSubConSecContainer">
              <label htmlFor="SubirArchivo">Subir Archivo:</label>
              <input
                type="file"
                name="archivo"
                id="archivo"
                required
                onChange={handleChangeArchivo}
              />
            </div>
            {errorMessages.archivo && (
              <p className="error-message">{errorMessages.archivo}</p>
            )}
            <div className="FormSubConSecContainer">
              <label htmlFor="Tarea">Tarea:</label>
              <input
                type="checkbox"
                name="isTarea"
                id="isTarea"
                checked={formData.isTarea}
                onChange={handleChange}
              />
            </div>
            {errorMessages.isTarea && (
              <p className="error-message">{errorMessages.isTarea}</p>
            )}
            {errorMessages.contenido && (
              <p className="error-message">{errorMessages.contenido}</p>
            )}
            <div className="ButtonSubmitCursoSubir">
              <PrimaryButtonLarge nombre={"Subir"} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ComBoxElementCursoSubir;
