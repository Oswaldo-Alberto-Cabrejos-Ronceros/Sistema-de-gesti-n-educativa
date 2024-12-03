import React, { useState } from "react";
import "./ComBoxElementTareaDocenteAdmin.css";
import { SlPencil } from "react-icons/sl";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import ModalDeleteContenido from "../ComBoxElementCursoDocenteAdministrador/ModalDeleteContenido/ModalDeleteContenido";
import contenidosService from "../../../services/contenidosService";
import ConfirmationModal from "../../VGestionUsuarios/Modals/ConfirmacionModal";

function ComBoxElementTareaDocenteAdmin({ curso, to, tarea, onDelete}) {
  const [showModal, setShowModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowModal(true);
  };

  const showConfirmationMessage = (message) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 1700);
  };

  const confirmDelete = () => {
    contenidosService
      .eliminarContenido(tarea.id)
      .then(() => {
        showConfirmationMessage("Tarea eliminada con éxito");
        onDelete(tarea.id)
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error al eliminar el contenido:", error);
        showConfirmationMessage("Ocurrió un error al eliminar la tarea");
      });
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <ConfirmationModal
        show={showConfirmation}
        message={confirmationMessage}
      />
      <Link
        state={{ curso, tarea }}
        to={to}
        className="LinkComBoxElementTareaDoceAdm"
      >
        <div className="ComBoxElementTareaDocenteAdminContainer">
          <div className="IconTareaContainer">
            <SlPencil />
          </div>
          <p className="PMd">{"Tarea: " + tarea.nombreContenido}</p>
          <div className="IconsTareaEdElContainer">
            <div className="IconTareaEliminarContainer" onClick={handleDelete}>
              <MdOutlineDeleteOutline />
            </div>
          </div>
        </div>
      </Link>
      <ModalDeleteContenido
        show={showModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}

export default ComBoxElementTareaDocenteAdmin;
