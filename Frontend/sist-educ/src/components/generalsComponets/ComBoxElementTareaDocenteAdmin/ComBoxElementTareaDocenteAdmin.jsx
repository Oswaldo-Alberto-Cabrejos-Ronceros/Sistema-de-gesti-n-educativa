import React from 'react'
import './ComBoxElementTareaDocenteAdmin.css'
import { SlPencil } from "react-icons/sl";
import { GoPencil } from "react-icons/go";
import { MdOutlineDeleteOutline } from "react-icons/md";

function ComBoxElementTareaDocenteAdmin({tarea}) {
  return (
    <div className='ComBoxElementTareaDocenteAdminContainer'>
            <div className="IconTareaContainer">
        <SlPencil />
      </div>
      <p className="PMd">{tarea.nombre}</p>
      <a href={tarea.link}>contenido</a>
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
  )
}

export default ComBoxElementTareaDocenteAdmin