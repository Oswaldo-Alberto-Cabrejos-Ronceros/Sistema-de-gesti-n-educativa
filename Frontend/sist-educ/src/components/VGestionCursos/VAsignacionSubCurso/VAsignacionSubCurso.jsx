import React , { useState, useEffect } from "react";
import SubcursoService from '../../../services/subcursoService'
import TablaAsignacionSubCurso from "./TablaAsignacionSubCurso/TablaAsignacionSubCurso";
import './VAsignacionSubCurso.css'

function VAsignacionSubCurso() {
    const [subcursos, setSubCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    if (loading) return <div>Cargando subcursos...</div>;
    if (error) return <div>{error}</div>;
    // Agregar subcurso en vivo


  return (
    <div className="VAsignacionSubCursoContainer">
      <div className="VAsignacionSubCursoTitleContainer">
        <h3>Asignación de Subcursos</h3>
      </div>
      <div className="VAsignacionSubCursoContent">
        <div>
        <TablaAsignacionSubCurso subcursos={subcursos}/>
        </div>
      </div>
    </div>
  );
}

export default VAsignacionSubCurso;
