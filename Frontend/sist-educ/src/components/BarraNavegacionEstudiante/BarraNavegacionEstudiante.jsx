import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BarraNavegacionEstudiante.css";
import NavItem from "../generalsComponets/NavItem/NavItem";
import { IoBookOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import NavUser from "../generalsComponets/CardUser/NavUser";
import { FaSignOutAlt } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

function barraNavegacionEstudiante({ nombre, apellido }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para controlar el modal
  const [showMenu, setShowMenu] = useState(window.innerWidth > 1130); 
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    // Limpiar sessionStorage y redirigir
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(window.innerWidth > 1130); // Mostrar menú automáticamente en pantallas grandes
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const setShowMenuFalse = ()=>{
    setShowMenu(false);
  }
  

  return (
    <div>
      <div className="HorizontalContainer">
        <div className="MenuIconContainer" onClick={handleShowMenu}>
          <IoMenu />
        </div>
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
      {showMenu ? (
        <div className={`VerticalContainer ${showMenu ? "show" : "hide"}`}>
          <div className="OptionsContainer">
            <NavItem
              id={"Cursos"}
              titulo={"Cursos"}
              icon={<IoBookOutline />}
              to="cursos"
              onClick={window.innerWidth > 1130===true?(null):(setShowMenuFalse)}
            />
            <NavItem
              id={"Horario"}
              titulo={"Horario"}
              icon={<FaCalendarAlt />}
              to="horario"
              onClick={window.innerWidth > 1130===true?(null):(setShowMenuFalse)}
            />
            <NavItem
              id={"Notas"}
              titulo={"Notas"}
              icon={<GrNotes />}
              to="notas"
              onClick={window.innerWidth > 1130===true?(null):(setShowMenuFalse)}
            />
            <NavItem
              id={"Honor"}
              titulo={"Honor"}
              icon={<FaRankingStar />}
              to="honor"
              onClick={window.innerWidth > 1130===true?(null):(setShowMenuFalse)}
            />
          </div>
        </div>
      ) : (
        <></>
      )}

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
              <button onClick={handleLogoutConfirm} className="LogoutButtonYes">
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
