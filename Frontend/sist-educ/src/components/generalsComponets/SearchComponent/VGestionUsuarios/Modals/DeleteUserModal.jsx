import React from "react";
import "./DeleteUserModal.css";

function DeleteUserModal({ show, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                <div className="delete-modal-buttons">
                    <button onClick={onConfirm} className="delete-button yes-button">Sí</button>
                    <button onClick={onCancel} className="delete-button no-button">No</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteUserModal;