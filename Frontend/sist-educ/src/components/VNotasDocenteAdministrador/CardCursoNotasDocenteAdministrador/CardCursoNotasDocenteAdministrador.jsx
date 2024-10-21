import React from 'react'
import PrimaryButton from '../../generalsComponets/PrimaryButton/PrimaryButton'
import './CardCursoNotasDocenteAdministrador.css'
import { Link } from 'react-router-dom'

function CardCursoNotasDocenteAdministrador({curso}) {
  return (
    <div className='CardCursoNotasDocenteAdministradorContainer'>
        <div className='CardCursoNotasDocenteAdministradorSupContainer'>
            <p className='PLg'>{curso.nombre}</p>
        </div>
        <div className='CardCursoNotasDocenteAdministradorMedContainer'>
            <div className='CardCursoNotasDocenteAdministradorMedSubContainer'>
              <div className='CardCursoNotasDocenteAdministradorMedSubContainerColumn'>
            <p className='PMd'>Grado:</p>
            <p className='PMd'>{curso.grado}</p>
            <p className='PMd'>Nivel:</p>
            <p className='PMd'>{curso.nivel}</p>
            <p className='PMd'>Seccion:</p>
            <p className='PMd'>{curso.seccion}</p>
            </div>
            </div>
            <div className='CardCursoNotasDocenteAdministradorMedSubContainer'>
              <div className='CardCursoNotasDocenteAdministradorMedSubContainerColumn'>
            <p className='PMd'>Unidades:</p>
            <p className='PMd'>Unidad 1</p>
            <p className='PMd'>Unidad 2</p>
            <p className='PMd'>Unidad 3</p>
            <p className='PMd'>Unidad 4</p>
            <p className='PMd'>Unidad 5</p>
            <p className='PMd'>Unidad 6</p>
            <p className='PMd'>Unidad 7</p>
            <p className='PMd'>Unidad 8</p>
            </div>
            </div>
        </div>
        <div className='CardNotasDocenteAdministradorInfContainer'>
            <Link className='LinkCardNotasDocAdmin' to={"vernotas"} state={{curso}}>
            <PrimaryButton nombre="Ver Notas"/>
            </Link>
            <Link className='LinkCardNotasDocAdmin' to={"subirnotas"} state={{curso}}>
            <PrimaryButton nombre="Subir Notas"/>
            </Link>
            </div>
    </div>
  )
}

export default CardCursoNotasDocenteAdministrador