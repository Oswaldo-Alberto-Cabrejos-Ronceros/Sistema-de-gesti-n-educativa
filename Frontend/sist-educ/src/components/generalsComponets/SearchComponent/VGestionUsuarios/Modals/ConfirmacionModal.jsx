// ConfirmationModal.js
import React from "react";
import "./ConfirmacionModal.css";

function ConfirmationModal({ show, message }) {
    if (!show || !message) return null;

    return (
        <div className="confirmation-modal-overlay">
            <div className="confirmation-modal-content">
                <p>{message}</p>
            </div>
        </div>
    );
}

export default ConfirmationModal;
