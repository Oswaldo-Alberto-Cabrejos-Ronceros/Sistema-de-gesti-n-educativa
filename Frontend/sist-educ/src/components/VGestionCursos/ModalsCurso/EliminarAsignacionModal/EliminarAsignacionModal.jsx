import React from "react";


function EliminarAsignacionModal({ show, message, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                <p>{message}</p>
                <div className="delete-modal-buttons">
                    <button onClick={onConfirm} className="delete-button yes-button">Sí</button>
                    <button onClick={onCancel} className="delete-button no-button">No</button>
                </div>
            </div>
        </div>
    );
}

export default EliminarAsignacionModal;