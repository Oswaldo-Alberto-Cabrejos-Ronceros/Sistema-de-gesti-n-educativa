import React from 'react'
import './BarraNavegacionAdministrador.css';
import { Link } from 'react-router-dom';
import NavItem from '../generalsComponets/NavItem/NavItem';
import NavUser from '../generalsComponets/CardUser/NavUser';
import { FaSignOutAlt } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { FaRankingStar } from "react-icons/fa6";
import { FiTrendingUp } from "react-icons/fi";
import { TbUserEdit } from "react-icons/tb";
import { GoPencil } from "react-icons/go";

function BarraNavegacionAdministrador() {
  return (
    <div className='BarraNavegacionAdministradorContainer'>
      <div className="HorizontalContainerBarAdministrador">
        <Link to="/usuario">
        <NavUser
          nombre={"Administrador"}
          imagen={"https://dashboard.rtta.rw/public/assets/img/avatar.png"}
        />
        </Link>
        <div className="SessionOutContainer">
        <FaSignOutAlt/>
        </div>
      </div>
      <div className="VerticalContainerBarAdmin">
        <div className="OptionsContainer">
          <NavItem id={"Cursos"} titulo={"Cursos"} icon={<IoBookOutline />} to="/cursos"/>
          <NavItem id={"Horario"} titulo={"Horario"} icon={<FaCalendarAlt />} to="/horario"/>
          <NavItem id={"Tareas"} titulo={"Tareas"} icon={<FaTasks />} to="/tareas"/>
          <NavItem id={"Notas"} titulo={"Notas"} icon={<GrNotes />} to="/notas"/>
          <NavItem id={"Usuarios"} titulo={"Usuarios"} icon={<TbUserEdit />} to="/usuarios"/>
          <NavItem id={"GestionCursos"} titulo={"Gestión Cursos"} icon={<GoPencil />} to="/gestioncursos"/>
          <NavItem id={"Honor"} titulo={"Honor"} icon={<FaRankingStar />} to="/honor"/>
          <NavItem id={"Informes"} titulo={"Informes"} icon={<FiTrendingUp />} to="/informes"/>
        </div>
      </div>
    </div>
  )
}

export default BarraNavegacionAdministrador