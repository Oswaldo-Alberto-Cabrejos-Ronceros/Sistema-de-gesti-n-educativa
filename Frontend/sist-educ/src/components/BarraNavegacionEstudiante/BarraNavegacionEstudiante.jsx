import React from "react";
import "./BarraNavegacionEstudiante.css";
import NavItem from "../generalsComponets/NavItem/NavItem";
import { IoBookOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import NavUser from "../generalsComponets/CardUser/NavUser";
import { FaSignOutAlt } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

function barraNavegacionEstudiante() {
  return (
    <div>
      <div className="HorizontalContainer">
        <Link to="/usuario">
        <NavUser
          nombre={"Estudiante"}
          imagen={"https://dashboard.rtta.rw/public/assets/img/avatar.png"}
        />
        </Link>
        <div className="SessionOutContainer">
        <FaSignOutAlt/>
        </div>
      </div>
      <div className="VerticalContainer">
        <div className="OptionsContainer">
          <NavItem id={"Cursos"} titulo={"Cursos"} icon={<IoBookOutline />} to="/cursos"/>
          <NavItem id={"Horario"} titulo={"Horario"} icon={<FaCalendarAlt />} to="/horario"/>
          <NavItem id={"Tareas"} titulo={"Tareas"} icon={<FaTasks />} to="/tareas"/>
          <NavItem id={"Chat"} titulo={"Chat"} icon={<IoChatbubbleEllipsesSharp/>} to="/chat"/>
          <NavItem id={"Notas"} titulo={"Notas"} icon={<GrNotes />} to="/notas"/>
          <NavItem id={"Honor"} titulo={"Honor"} icon={<FaRankingStar />} to="/honor"/>
        </div>
      </div>
    </div>
  );
}

export default barraNavegacionEstudiante;
