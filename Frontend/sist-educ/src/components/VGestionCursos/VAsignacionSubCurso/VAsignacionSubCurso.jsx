import React , { useState, useEffect } from "react";
import DocenteService from '../../../services/docenteService'
import TablaAsignacionSubCurso from "./TablaAsignacionSubCurso/TablaAsignacionSubCurso";
import './VAsignacionSubCurso.css'
import ConfirmationModal from "../../VGestionUsuarios/Modals/ConfirmacionModal";


function VAsignacionSubCurso() {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchDocentes();
  }, []);

  const fetchDocentes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await DocenteService.getAllDocente();
      setDocentes(response.data);
    } catch (error) {
      setError("Error al cargar docentes. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const showConfirmationMessage = (message, duration = 1300) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), duration);
  };

  if (loading) return <div>Cargando docentes...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="VAsignacionSubCursoContainer">
      <div className="VAsignacionSubCursoTitleContainer">
        <h3>Asignación de Subcursos</h3>
      </div>
      <div className="VAsignacionSubCursoContent">
        <div>
        <TablaAsignacionSubCurso 
          docentes={docentes} 
          onDocenteUpdated={fetchDocentes} 
          onShowConfirmation={showConfirmationMessage} 
        />
        </div>
        <ConfirmationModal show={showConfirmation} message={confirmationMessage} />
      </div>
    </div>
  );
}

export default VAsignacionSubCurso;
