import React, { useEffect, useState } from "react";
import "./FormularioAgregarSubCurso.css";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import { RiBook2Line } from "react-icons/ri";
import TextAreaComponent from "../../../generalsComponets/TextAreaComponent/TextAreaComponent";
import { HiOutlinePencilAlt } from "react-icons/hi";
import ButtonSubmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import CursoService from "../../../../services/cursosService"
import SubcursoService from "../../../../services/subcursoService";
import ConfirmationModal from "../../../VGestionUsuarios/Modals/ConfirmacionModal"

function FormularioAgregarSubCurso({ onSubCursoAdded }) {
  const [nivel, setNivel] = useState("SELECCIONAR");
  const [cursoOptions, setCursoOptions] = useState([]);
  const [selectedCursoId, setSelectedCursoId] = useState("SELECCIONAR");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [errorMessages, setErrorMessages] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (nivel !== "SELECCIONAR") {
      CursoService.listarCursosPorNivel(nivel)
        .then((response) => {
          const options = [
            { value: "SELECCIONAR", label: "Seleccionar Curso" },
            ...response.data.map((curso) => ({
              label: curso.nombre,
              value: curso.cursoId,
            })),
          ];
          setCursoOptions(options);
        })
        .catch((error) => {
          console.error("Error al obtener los cursos:", error);
        });
    } else {
      setCursoOptions([]);
    }
  }, [nivel]);

  const handleNivelChange = (event) => {
    setNivel(event.target.value);
    setSelectedCursoId("SELECCIONAR");
  };

  const handleCursoChange = (event) => {
    setSelectedCursoId(event.target.value);
  };

  const showErrorMessage = (field, message) => {
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: message }));
    setTimeout(() => {
      setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }, 1300);
  };

  const showConfirmationMessage = (message, duration = 2500) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), duration);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      showErrorMessage("nombre", "El nombre es obligatorio");
      return;
    }
    if (!descripcion.trim()) {
      showErrorMessage("descripcion", "La descripción es obligatoria");
      return;
    }
    if (selectedCursoId === "SELECCIONAR") {
      showErrorMessage("curso", "Debe seleccionar un curso");
      return;
    }
  
    const subCursoData = {
      cursoId: selectedCursoId,
      nombre: nombre,
      descripcion,
    };
  
    SubcursoService.createSubcurso(subCursoData)
      .then((response) => {
        showConfirmationMessage("Subcurso agregado con éxito");
        setNombre("");
        setDescripcion("");
        setSelectedCursoId("SELECCIONAR");
        setNivel("SELECCIONAR");
        onSubCursoAdded(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          // Mensaje personalizado con nombre y nivel
          showConfirmationMessage(`Ya existe un subcurso con el nombre "${nombre}" en el nivel "${nivel}"`);
        } else {
          showConfirmationMessage("Error al crear el subcurso");
        }
      });
  };

  return (
    <div className="FormularioAgregarSubCursoContainer">
      <ConfirmationModal show={showConfirmation} message={confirmationMessage} />

      <form onSubmit={handleSubmit}>
        <h3>Agregar SubCurso</h3>
        <div className="formularioAgregarSubCursoContentPrin">
          {/* Nombre y Nivel en una fila */}
          <div className="label-input-container">
            <label htmlFor="Nombre">Nombre:</label>
            <InputComponent
              nombre="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              icon={<RiBook2Line />}
            />
            {errorMessages.nombre && <p className="error-message">{errorMessages.nombre}</p>}
          </div>

          <div className="label-input-container">
            <label htmlFor="Nivel">Nivel:</label>
            <SelectComponent
              options={[
                { value: "SELECCIONAR", label: "Seleccionar Nivel" },
                { value: "PRIMARIA", label: "Primaria" },
                { value: "SECUNDARIA", label: "Secundaria" },
              ]}
              value={nivel}
              onChange={handleNivelChange}
            />
            {errorMessages.nivel && <p className="error-message">{errorMessages.nivel}</p>}
          </div>

          {/* Descripción y Curso en otra fila */}
          <div className="label-input-container textarea-container">
            <label htmlFor="Descripcion">Descripción:</label>
            <TextAreaComponent
              nombre="Descripcion"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              icon={<HiOutlinePencilAlt />}
            />
            {errorMessages.descripcion && <p className="error-message">{errorMessages.descripcion}</p>}
          </div>

          <div className="label-input-container">
            <label htmlFor="Curso">Curso:</label>
            <SelectComponent
              options={cursoOptions}
              value={selectedCursoId}
              onChange={handleCursoChange}
            />
            {errorMessages.curso && <p className="error-message">{errorMessages.curso}</p>}
          </div>
        </div>

        {/* Botón de enviar */}
        <div className="buttonSubmitSubCursoContainer">
          <ButtonSubmit className="buttonSubmitCurso" nombre="Agregar" />
        </div>
      </form>
    </div>
  );
}

export default FormularioAgregarSubCurso;