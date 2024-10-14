import React from 'react'
import './VGestionCursosCursos.css'
import SearchComponent from '../../generalsComponets/SearchComponent/SearchComponent'
import TablaGestionCursos from './TablaGestionCursos/TablaGestionCursos'
import FormularioAgregarCurso from './FormularioAgregarCurso/FormularioAgregarCurso'

function VGestionCursosCursos({cursos}) {
  return (
    <div className='VGestionCursosCursosContainer'>
        <div className='VGestionCursosCursosContainerTitle'>
            <h3>
                Cursos:
            </h3>
        </div>
        <SearchComponent nombre={"Cursos"} placeholder={"Buscar Curso"}/>
        <div className='TablaGestionCursosContainer'>
            <TablaGestionCursos cursos={cursos}/>
        </div>
        <div>
            <FormularioAgregarCurso/>
        </div>
    </div>
  )
}

export default VGestionCursosCursos