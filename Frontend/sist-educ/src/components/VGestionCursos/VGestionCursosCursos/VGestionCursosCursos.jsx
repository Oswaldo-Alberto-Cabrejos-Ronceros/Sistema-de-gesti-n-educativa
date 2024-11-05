import React,{ useState, useEffect } from 'react'
import './VGestionCursosCursos.css'
import SearchComponent from '../../generalsComponets/SearchComponent/SearchComponent'
import TablaGestionCursos from './TablaGestionCursos/TablaGestionCursos'
import FormularioAgregarCurso from './FormularioAgregarCurso/FormularioAgregarCurso'
import CursoService from '../../../services/cursosService'

function VGestionCursosCursos() {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
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
          <h3>Cursos:</h3>
        </div>
        <div className='VGestionCursosCursosContainerSearch'>
        <SearchComponent nombre={"Cursos"} placeholder={"Buscar Curso"} />
        </div>
        <div className="TablaGestionCursosContainer">
          <TablaGestionCursos cursos={cursos} onCourseUpdated={handleCourseUpdated} onCourseDeleted={handleCourseDeleted} />
        </div>
        <div>
          <FormularioAgregarCurso onCourseAdded={fetchCursos} />
        </div>
      </div>
    );
  }
  
  export default VGestionCursosCursos;