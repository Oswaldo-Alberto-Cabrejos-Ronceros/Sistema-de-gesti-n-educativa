import React,{ useState, useEffect } from 'react'
import './VGestionCursosCursos.css'

import TablaGestionCursos from './TablaGestionCursos/TablaGestionCursos'
import FormularioAgregarCurso from './FormularioAgregarCurso/FormularioAgregarCurso'
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";
import CursoService from '../../../services/cursosService'

function VGestionCursosCursos() {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formularioIsVisible, setformularioIsVisible] = useState(false);
  
    // Función para alternar la visibilidad
    const toggleVisibility = () => {
      setformularioIsVisible(!formularioIsVisible);
    };

    useEffect(() => {
      fetchCursos();
    }, []);
  
    const fetchCursos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await CursoService.getAllCursos();
        setCursos(response.data);
      } catch (error) {
        setError("Error al cargar cursos. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };
  
    // Actualizar curso en vivo
    const handleCourseUpdated = (updatedCurso) => {
      setCursos((prevCursos) =>
        prevCursos.map((curso) =>
          curso.cursoId === updatedCurso.cursoId ? updatedCurso : curso
        )
      );
    };
  // Eliminar estudiante en vivo
  const handleCourseDeleted = (deletedId) => {
    setCursos((prevCursos) =>
        prevCursos.filter((curso) => curso.cursoId !== deletedId)
    );
  };

  
    if (loading) return <div>Cargando cursos...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div className="VGestionCursosCursosContainer">
        <div className="VGestionCursosCursosContainerTitle">
          <h3>Cursos</h3>
        </div>
        <div className="VGestionCursosContent">
          <TablaGestionCursos cursos={cursos} onCourseUpdated={handleCourseUpdated} onCourseDeleted={handleCourseDeleted} />
        </div>
        <div className="ButtonFormularioContent">
        <PrimaryButton nombre={formularioIsVisible ? "Ocultar" : "Mostrar" } onClick={toggleVisibility}/>
        </div>
        {formularioIsVisible &&  <FormularioAgregarCurso onCourseAdded={fetchCursos} />}
      </div>
    );
  }
  
  export default VGestionCursosCursos;