import React, { useEffect, useState } from "react";
import DocenteService from "../../../services/docenteService";
import "./VGestionDocentes.css";
import TablaGestionDocentes from "./TablaGestionDocentes/TablaGestionDocentes";
import FormularioAgregarDocente from "./FormularioAgregarDocente/FormularioAgregarDocente";

function VGestionDocentes() {
  const [docentes, setDocentes] = useState([]); // Estado para almacenar docentes
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    fetchDocentes();
  }, []);

  // Función para obtener docentes del backend
  const fetchDocentes = async () => {
    try {
      const response = await DocenteService.getAllDocente();
      console.log("Docentes recibidos:", response.data);
      setDocentes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar docentes:", error);
      setError("Error al cargar docentes. Inténtalo más tarde.");
      setLoading(false);
    }
  };

  // Mensaje de carga o error
  if (loading) return <div>Cargando docentes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="VGestionDocentesContainer">
      <div className="TitleGestionDocentes">
        <h3>Gestion de Docentes:</h3>
      </div>
      <div className="VGestionDocentesContent">
        <div className="TablaGestionDocentesContainer">
          <TablaGestionDocentes docentes={docentes} />
        </div>
        <FormularioAgregarDocente onDocenteAdded={fetchDocentes} />
      </div>
    </div>
  );
}

export default VGestionDocentes;
