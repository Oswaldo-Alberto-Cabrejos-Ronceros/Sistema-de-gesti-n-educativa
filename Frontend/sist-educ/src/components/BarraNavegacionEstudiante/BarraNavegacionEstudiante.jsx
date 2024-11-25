import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./BarraNavegacionEstudiante.css";
import NavItem from "../generalsComponets/NavItem/NavItem";
import { IoBookOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import NavUser from "../generalsComponets/CardUser/NavUser";
import { FaSignOutAlt } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";


function barraNavegacionEstudiante({nombre, apellido}) {
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    // Limpiar sessionStorage y redirigir
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <div className="HorizontalContainer">
        <Link to="usuario">
        <NavUser
          nombre={apellido + ", " + nombre}
          imagen={"https://dashboard.rtta.rw/public/assets/img/avatar.png"}
        />
        </Link>
        <div
          className="SessionOutContainer"
          onClick={() => setShowLogoutModal(true)}
        >
          <FaSignOutAlt />
        </div>
      </div>
      <div className="VerticalContainer">
        <div className="OptionsContainer">
          <NavItem id={"Cursos"} titulo={"Cursos"} icon={<IoBookOutline />} to="cursos"/>
          <NavItem id={"Horario"} titulo={"Horario"} icon={<FaCalendarAlt />} to="horario"/>
          <NavItem id={"Chat"} titulo={"Chat"} icon={<IoChatbubbleEllipsesSharp/>} to="chat"/>
          <NavItem id={"Notas"} titulo={"Notas"} icon={<GrNotes />} to="notas"/>
          <NavItem id={"Honor"} titulo={"Honor"} icon={<FaRankingStar />} to="honor"/>
        </div>
      </div>
      {/* Modal de confirmación de cierre de sesión */}
      {showLogoutModal && (
        <div className="LogoutModalOverlay">
          <div className="LogoutModalContent">
            <h3>¿Estás seguro de cerrar la sesión?</h3>
            <div className="LogoutModalButtons">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="LogoutButtonNo"
              >
                No
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="LogoutButtonYes"
              >
                Sí
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default barraNavegacionEstudiante;