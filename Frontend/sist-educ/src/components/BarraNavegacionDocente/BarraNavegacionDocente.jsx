import React from 'react'
import './BarraNavegacionDocente.css'
import NavItem from '../generalsComponets/NavItem/NavItem'
import NavUser from '../generalsComponets/CardUser/NavUser'
import { IoBookOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { FaSignOutAlt } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";

function BarraNavegacionDocente() {
  return (
    <div className='BarraNavegacionDocenteContainer'>
      <div className="HorizontalContainerBarDocente">
        <Link to="usuario">
        <NavUser
          nombre={"Docente"}
          imagen={"https://dashboard.rtta.rw/public/assets/img/avatar.png"}
        />
        </Link>
        <div className="SessionOutContainer">
        <FaSignOutAlt/>
        </div>
      </div>
      <div className="VerticalContainerBarDocente">
        <div className="OptionsContainer">
          <NavItem id={"Cursos"} titulo={"Cursos"} icon={<IoBookOutline />} to="cursos"/>
          <NavItem id={"Horario"} titulo={"Horario"} icon={<FaCalendarAlt />} to="horario"/>
          <NavItem id={"Tareas"} titulo={"Tareas"} icon={<FaTasks />} to="tareas"/>
          <NavItem id={"Chat"} titulo={"Chat"} icon={<IoChatbubbleEllipsesSharp/>} to="chat"/>
          <NavItem id={"Notas"} titulo={"Notas"} icon={<GrNotes />} to="notas"/>
          <NavItem id={"Honor"} titulo={"Honor"} icon={<FaRankingStar />} to="honor"/>
          <NavItem id={"Informes"} titulo={"Informes"} icon={<FiTrendingUp />} to="informes"/>
        </div>
      </div>
    </div>
  )
}

export default BarraNavegacionDocente