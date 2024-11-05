import React, { useState, useEffect } from "react";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import ButtonSubmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import ConfirmationModal from "../../../VGestionUsuarios/Modals/ConfirmacionModal";
import { TbUserEdit } from "react-icons/tb";
import CursoService from "../../../../services/cursosService"
import SubcursoService from "../../../../services/subcursoService"
import DocenteService from "../../../../services/docenteService"
import "./AsignarDocenteModal.css";

function AsignarDocenteModal({ show, docente, onDocenteUpdated, onClose, onShowConfirmation }) {
  const [nivel, setNivel] = useState(docente?.nivel || "SELECCIONAR");
  const [cursoOptions, setCursoOptions] = useState([]);
  const [selectedCursoId, setSelectedCursoId] = useState("SELECCIONAR");
  const [subcursoOptions, setSubcursoOptions] = useState([]);
  const [selectedSubcursoId, setSelectedSubcursoId] = useState("SELECCIONAR");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (nivel !== "SELECCIONAR") {
      CursoService.listarCursosPorNivel(nivel)
        .then((response) => {
          setCursoOptions([
            { label: "SELECCIONAR", value: "SELECCIONAR" },
            ...response.data.map((curso) => ({
              label: curso.nombre,
              value: curso.cursoId,
            })),
          ]);
        })
        .catch((error) => console.error("Error al obtener los cursos:", error));
    } else {
      setCursoOptions([{ label: "SELECCIONAR", value: "SELECCIONAR" }]);
    }
    setSelectedCursoId("SELECCIONAR");
    setSubcursoOptions([{ label: "SELECCIONAR", value: "SELECCIONAR" }]);
  }, [nivel]);

  useEffect(() => {
    if (selectedCursoId !== "SELECCIONAR") {
      SubcursoService.getlistarSubcursosPorCurso(selectedCursoId)
        .then((response) => {
          setSubcursoOptions([
            { label: "SELECCIONAR", value: "SELECCIONAR" },
            ...response.data.map((subcurso) => ({
              label: subcurso.nombre,
              value: subcurso.subcursoId,
            })),
          ]);
        })
        .catch((error) => console.error("Error al obtener los subcursos:", error));
    } else {
      setSubcursoOptions([{ label: "SELECCIONAR", value: "SELECCIONAR" }]);
    }
  }, [selectedCursoId]);

  const handleNivelChange = (e) => {
    setNivel(e.target.value);
    setSelectedCursoId("SELECCIONAR");
    setSelectedSubcursoId("SELECCIONAR");
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (selectedCursoId === "SELECCIONAR" || selectedSubcursoId === "SELECCIONAR") {
        setConfirmationMessage("Debe seleccionar un curso y un subcurso válidos.");
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 2000);
        return;
    }

    const dataToSend = {
        usuarioId: docente.usuarioId,
        subcursosIds: [selectedSubcursoId],
    };

    try {
        await DocenteService.asignarProfesor(dataToSend);
        onShowConfirmation("Subcurso asignado correctamente");
        onDocenteUpdated(); // Actualiza la tabla en el componente principal
        onClose(); // Cierra el modal
    } catch (error) {
        const errorMessage = error.response?.data || "Error al asignar subcurso";
        onShowConfirmation(errorMessage);
    }
};

  if (!show) return null;

  return (
    <div className="AsignarDocenteModalContainer">
      <div className="AsignarDocenteModalContent">
        <button onClick={onClose} className="AsignarDocenteModalCloseButton">✕</button>
        <h4>Asignar Subcurso</h4>
        <ConfirmationModal show={showConfirmation} message={confirmationMessage} />

        <form className="AsignarDocenteModalForm" onSubmit={handleSave}>
          <div className="AsignarDocenteModalFormSecondaryContainer">
            <div className="AsignarDocenteModalFormLabelInputRow">
              <label>Nombres Docente:</label>
              <InputComponent
                nombre="nombreDocente"
                placeholder="Nombres de Docente"
                icon={<TbUserEdit />}
                type="text"
                value={docente?.nombre || ""}
                disabled
              />
            </div>
            <div className="AsignarDocenteModalFormLabelInputRow">
              <label>Apellidos Docente:</label>
              <InputComponent
                nombre="apellidoDocente"
                placeholder="Apellidos de Docente"
                icon={<TbUserEdit />}
                type="text"
                value={docente?.apellido || ""}
                disabled
              />
            </div>
            <div className="AsignarDocenteModalFormLabelInputRow">
              <label>Nivel:</label>
              <SelectComponent
                options={[
                  { label: "SELECCIONAR", value: "SELECCIONAR" },
                  { label: "PRIMARIA", value: "PRIMARIA" },
                  { label: "SECUNDARIA", value: "SECUNDARIA" },
                ]}
                value={nivel}
                onChange={handleNivelChange}
              />
            </div>
            <div className="AsignarDocenteModalFormLabelInputRow">
              <label>Curso:</label>
              <SelectComponent
                options={cursoOptions}
                value={selectedCursoId}
                onChange={(e) => setSelectedCursoId(e.target.value)}
              />
            </div>
            <div className="AsignarDocenteModalFormLabelInputRow">
              <label>Subcurso:</label>
              <SelectComponent
                options={subcursoOptions}
                value={selectedSubcursoId}
                onChange={(e) => setSelectedSubcursoId(e.target.value)}
              />
            </div>
          </div>
          <div className="AsignarDocenteModalButtonContainer">
            <ButtonSubmit className="AsignarDocenteModalButtonSave" nombre="Guardar" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AsignarDocenteModal;