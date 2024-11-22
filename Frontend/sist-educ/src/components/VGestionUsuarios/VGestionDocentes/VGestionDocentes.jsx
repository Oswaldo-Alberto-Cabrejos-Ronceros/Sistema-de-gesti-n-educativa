import React, { useEffect, useState } from "react";
import DocenteService from "../../../services/docenteService";
import "./VGestionDocentes.css";
import TablaGestionDocentes from "./TablaGestionDocentes/TablaGestionDocentes";
import FormularioAgregarDocente from "./FormularioAgregarDocente/FormularioAgregarDocente";
import SearchComponent from "../../generalsComponets/SearchComponent/SearchComponent";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";

function VGestionDocentes() {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formularioIsVisible, setformularioIsVisible] = useState(false);

    // Función para alternar la visibilidad
    const toggleVisibility = () => {
      setformularioIsVisible(!formularioIsVisible);
    };

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
        <h3>Docentes</h3>
      </div>
      <div className='VGestionDocentesContainerSearch'>
        <SearchComponent nombre={"Cursos"} placeholder={"Buscar Docente"} />
        </div>
      <div className="VGestionDocentesContent">
        <TablaGestionDocentes
          docentes={docentes}
          onDocenteDeleted={handleDocenteDeleted}
          onDocenteUpdated={handleDocenteUpdated}
        />
        <div className="ButtonFormularioContent">
        <PrimaryButton nombre={formularioIsVisible ? "Ocultar" : "Mostrar" } onClick={toggleVisibility}/>
        </div>
        {formularioIsVisible &&  <FormularioAgregarDocente onDocenteAdded={fetchDocentes} />}
        
      </div>
    </div>
  );
}

export default VGestionDocentes;
