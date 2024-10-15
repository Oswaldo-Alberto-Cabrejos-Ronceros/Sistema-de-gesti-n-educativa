import React from 'react'
import PrimaryButton from '../../generalsComponets/PrimaryButton/PrimaryButton'
import './CardCursoDocente.css'

function CardCursoDocente(props) {
    const handleClick1 = () => {
        alert("Boton presionado ver notas");
      };
      const handleClick2 = () => {
        alert("Boton presionado subir notas");
      };
  return (
    <div className='CardCursoDocenteContainer'>
        <div className='CardCursoDocenteSup'>
            <p className='PLg'>{props.curso.name}</p>
        </div>
        <div className='CardCursoDocenteMed'>
            <div className='CardCursoDocenteMedH'>
            <p className='PMd'>Grado:</p>
            <p className='PSm'>{props.curso.grado}</p>
            <p className='PMd'>Nivel:</p>
            <p className='PSm'>{props.curso.nivel}</p>
            <p className='PMd'>Seccion:</p>
            <p className='PSm'>{props.curso.seccion}</p>
            </div>
            <div className='CardCursoDocenteMedH'>
            <p className='PMd'>Unidades:</p>
            <p className='PSm'>Unidad 1</p>
            <p className='PSm'>Unidad 2</p>
            <p className='PSm'>Unidad 3</p>
            <p className='PSm'>Unidad 4</p>
            <p className='PSm'>Unidad 5</p>
            <p className='PSm'>Unidad 6</p>
            <p className='PSm'>Unidad 7</p>
            <p className='PSm'>Unidad 8</p>
            </div>
        </div>
        <div className='CardCursoDocenteInf'>
            <PrimaryButton onClick={handleClick1} nombre="Ver Notas" />
            <PrimaryButton onClick={handleClick2} nombre="Subir Notas" />
            </div>
    </div>
  )
}

export default CardCursoDocente