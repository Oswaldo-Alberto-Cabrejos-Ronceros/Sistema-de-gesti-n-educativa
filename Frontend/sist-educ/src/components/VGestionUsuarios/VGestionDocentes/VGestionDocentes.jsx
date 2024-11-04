import React, { useEffect, useState } from "react";
import DocenteService from "../../../services/docenteService";
import "./VGestionDocentes.css";
import TablaGestionDocentes from "./TablaGestionDocentes/TablaGestionDocentes";
import FormularioAgregarDocente from "./FormularioAgregarDocente/FormularioAgregarDocente";

function VGestionDocentes() {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleDocenteDeleted = (deletedId) => {
    setDocentes((prevDocentes) =>
      prevDocentes.filter((docente) => docente.usuarioId !== deletedId)
    );
  };

  const handleDocenteUpdated = (updatedDocente) => {
    setDocentes((prevDocentes) =>
      prevDocentes.map((docente) =>
        docente.usuarioId === updatedDocente.usuarioId ? updatedDocente : docente
      )
    );
  };

  if (loading) return <div>Cargando docentes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="VGestionDocentesContainer">
      <div className="TitleGestionDocentes">
        <h3>Gestión de Docentes:</h3>
      </div>
      <div className="VGestionDocentesContent">
        <TablaGestionDocentes
          docentes={docentes}
          onDocenteDeleted={handleDocenteDeleted}
          onDocenteUpdated={handleDocenteUpdated}
        />
        <FormularioAgregarDocente onDocenteAdded={fetchDocentes} />
      </div>
    </div>
  );
}

export default VGestionDocentes;
