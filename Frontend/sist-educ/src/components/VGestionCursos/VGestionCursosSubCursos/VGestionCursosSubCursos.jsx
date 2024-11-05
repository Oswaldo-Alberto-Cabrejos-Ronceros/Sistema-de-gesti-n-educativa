import React, { useState, useEffect } from 'react'
import './VGestionCursosSubCursos.css'
import SearchComponent from '../../generalsComponets/SearchComponent/SearchComponent'
import TablaGestionSubCursos from './TablaGestionSubCursos/TablaGestionSubCursos'
import FormularioAgregarSubCurso from './FormularioAgregarSubCurso/FormularioAgregarSubCurso'
import SubcursoService from '../../../services/subcursoService'

function VGestionCursosSubCursos() {
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

    // Actualizar subcurso en vivo
    const handleSubCursoUpdated = (updatedSubcurso) => {
        setSubCursos((prevSubCursos) =>
            prevSubCursos.map((subcurso) =>
                subcurso.subcursoId === updatedSubcurso.subcursoId ? updatedSubcurso : subcurso
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
                <h3>SubCursos:</h3>
            </div>
            <div className='VGestionCursosSubCursosContainerSearch'>
            <SearchComponent nombre={"Subcursos"} placeholder={"Buscar Subcurso"} />
            </div>
            <div className="TablaGestionSubCursosContainer">
                <TablaGestionSubCursos
                    subcursos={subcursos}
                    onSubCursoUpdated={handleSubCursoUpdated}
                    onSubCursoDeleted={handleSubCursoDeleted}
                />
            </div>
            <div>
                <FormularioAgregarSubCurso onSubCursoAdded={handleSubCursoAdded} />
            </div>
        </div>
    );
}

export default VGestionCursosSubCursos;