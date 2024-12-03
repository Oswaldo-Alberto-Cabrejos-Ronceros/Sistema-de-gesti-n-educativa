import React, { useState, useEffect } from "react";
import "./VGestionCursosSubCursos.css";
import TablaGestionSubCursos from "./TablaGestionSubCursos/TablaGestionSubCursos";
import FormularioAgregarSubCurso from "./FormularioAgregarSubCurso/FormularioAgregarSubCurso";
import SubcursoService from "../../../services/subcursoService";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";

function VGestionCursosSubCursos() {
  const [subcursos, setSubCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formularioIsVisible, setformularioIsVisible] = useState(false);

  // Función para alternar la visibilidad
  const toggleVisibility = () => {
    setformularioIsVisible(!formularioIsVisible);
  };

  useEffect(() => {
    fetchSubCursos(); // Cargar los subcursos al montar el componente
  }, []);

  const fetchSubCursos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await SubcursoService.getAllSubCurso();
      setSubCursos(response.data);
    } catch (error) {
      setError("Error al cargar subcursos. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar subcurso en vivo
  const handleSubCursoUpdated = (updatedSubcurso) => {
    setSubCursos((prevSubCursos) =>
      prevSubCursos.map((subcurso) =>
        subcurso.subcursoId === updatedSubcurso.subcursoId
          ? updatedSubcurso
          : subcurso
      )
    );
  };

  // Eliminar subcurso en vivo
  const handleSubCursoDeleted = (deletedId) => {
    setSubCursos((prevSubCursos) =>
      prevSubCursos.filter((subcurso) => subcurso.subcursoId !== deletedId)
    );
  };

  // Agregar subcurso en vivo
  const handleSubCursoAdded = (newSubcurso) => {
    setSubCursos((prevSubCursos) => [...prevSubCursos, newSubcurso]);
  };

  if (loading) return <div>Cargando subcursos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="VGestionCursosSubCursosContainer">
      <div className="VGestionCursosSubCursosContainerTitle">
        <h3>SubCursos</h3>
      </div>
      <div className="VGestionSubCursosContainer">
        <TablaGestionSubCursos
          subcursos={subcursos}
          onSubCursoUpdated={handleSubCursoUpdated}
          onSubCursoDeleted={handleSubCursoDeleted}
        />
      </div>
      <div className="ButtonFormularioContent">
        <PrimaryButton nombre={formularioIsVisible ? "Ocultar" : "Mostrar" } onClick={toggleVisibility}/>
        </div>
      <div>
      {formularioIsVisible &&  <FormularioAgregarSubCurso onSubCursoAdded={handleSubCursoAdded} />}
      </div>
    </div>
  );
}

export default VGestionCursosSubCursos;
