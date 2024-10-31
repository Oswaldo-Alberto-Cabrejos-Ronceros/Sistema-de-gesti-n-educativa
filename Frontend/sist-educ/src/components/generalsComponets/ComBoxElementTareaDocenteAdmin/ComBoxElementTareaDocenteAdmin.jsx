import React from 'react'
import './ComBoxElementTareaDocenteAdmin.css'
import { SlPencil } from "react-icons/sl";
import { GoPencil } from "react-icons/go";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';

function ComBoxElementTareaDocenteAdmin({curso, to, tarea}) {
  return (
    <Link state={{curso,tarea}} to={to}>
    <div className='ComBoxElementTareaDocenteAdminContainer'>
            <div className="IconTareaContainer">
        <SlPencil />
      </div>
      <p className="PMd">{tarea.nombre}</p>
      <p className="PMd">{tarea.fechaEntrega}</p>
      <div className="IconsTareaEdElContainer">
        <div className="IconTareaEditarContainer">
          <GoPencil />
        </div>
        <div className="IconTareaEliminarContainer">
          <MdOutlineDeleteOutline />
        </div>
      </div>
    </div>
    </Link>
  )
}

export default ComBoxElementTareaDocenteAdmin