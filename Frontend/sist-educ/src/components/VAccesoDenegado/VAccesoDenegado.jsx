import React from "react";
import "./VAccesoDenegado.css";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";

function VAccesoDenegado() {
  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
  let direccion;
  if (userData.rol === "ADMIN") {
    direccion = "/administrador";
  } else if (userData.rol === "STUDENT") {
    direccion = "/estudiante";
  } else if(userData.rol==="PROFESOR"){
    direccion = "/docente";
  } else{
    direccion = "/login";
  }
  return (
    <div className="VAccesoDenegadoContainer">
      <h1>404</h1>
      <h3>Pagina no encontrada</h3>
      <Link to={direccion} className="LinkVAccesoDenegado">
        <PrimaryButton nombre={"Ir a Inicio"} />
      </Link>
    </div>
  );
}

export default VAccesoDenegado;
