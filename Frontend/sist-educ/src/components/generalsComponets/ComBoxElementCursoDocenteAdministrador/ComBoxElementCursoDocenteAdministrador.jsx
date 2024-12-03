import React, { useState } from "react";
import "./ComBoxElementCursoDocenteAdministrador.css";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import ModalDeleteContenido from "./ModalDeleteContenido/ModalDeleteContenido";
import contenidosService from "../../../services/contenidosService";
import ConfirmationModal from "../../VGestionUsuarios/Modals/ConfirmacionModal";

function ComBoxElementCursoDocenteAdministrador({ curso, to, contenido, onDelete}) {
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
      .eliminarContenido(contenido.id)
      .then(() => {
        showConfirmationMessage("Contenido eliminado con éxito");
        onDelete(contenido.id)
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error al eliminar el contenido:", error);
        showConfirmationMessage("Ocurrió un error al eliminar el contenido.");
      });
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <Link
        state={{ curso, contenido }}
        to={to}
        className="LinkComBoxElementCursoDoceAdm"
      >
        <div className="ComBoxElementCursoDoceAdminContainer">
          <div className="IconContenidoContainer">
            <IoDocumentTextOutline />
          </div>
          <p className="PMd">{contenido.nombreContenido}</p>
          <div>
            <div className="IconEliminarContainer" onClick={handleDelete}>
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

export default ComBoxElementCursoDocenteAdministrador;
