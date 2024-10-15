import React from 'react'
import './VGestionCursosSubCursos.css'
import SearchComponent from '../../generalsComponets/SearchComponent/SearchComponent'
import TablaGestionSubCursos from './TablaGestionSubCursos/TablaGestionSubCursos'
import FormularioAgregarSubCurso from './FormularioAgregarSubCurso/FormularioAgregarSubCurso'

function VGestionCursosSubCursos({subcursos}) {
  return (
    <div className='VGestionCursosSubCursosContainer'>
                <div className='VGestionCursosSubCursosContainerTitle'>
            <h3>
                Cursos:
            </h3>
        </div>
        <SearchComponent nombre={"Subcursos"} placeholder={"Buscar Subcurso"}/>
        <div className='TablaGestionSubCursosContainer'>
            <TablaGestionSubCursos subcursos={subcursos}/>
        </div>
        <div>
            <FormularioAgregarSubCurso/>
        </div>
    </div>
  )
}

export default VGestionCursosSubCursos