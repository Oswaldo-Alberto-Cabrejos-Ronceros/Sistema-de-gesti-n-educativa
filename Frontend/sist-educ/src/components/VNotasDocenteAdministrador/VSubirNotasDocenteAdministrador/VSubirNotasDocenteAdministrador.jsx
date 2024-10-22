import React from "react";
import "./VSubirNotasDocenteAdministrador.css";
import TablaSubirNotasDocente from "./TablaSubirNotasDocenteAdministrador/TablaSubirNotasDocenteAdministrador";
import ButtonSubtmit from "../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import { useLocation } from "react-router-dom";

function VSubirNotasDocenteAdministrador() {
  const location = useLocation();
  const {curso} = location.state;
  const alumnos = [
    {
      "N°": "5",
      Dni: "78984545",
      Nombres: "Alonzo Jorge",
      Apellidos: "Cardenas Godoy",
    },
    {
      "N°": "8",
      Dni: "78848447",
      Nombres: "Karla Julia",
      Apellidos: "Fernandez Espinoza",
    },
    {
      "N°": "7",
      Dni: "78945612",
      Nombres: "Luis Hermenegildo",
      Apellidos: "Castillo Cerron",
    },
  ];
  const competencias = ["C1", "C2", "C3"];
  const unidades = [
    "Unidad 1",
    "Unidad 2",
    "Unidad 3",
    "Unidad 4",
    "Unidad 5",
    "Unidad 6",
    "Unidad 7",
    "Unidad 8",
  ];
  return (
    <div className="VSubirNotasContainer">
      <div className="OpcionTitleVNotasDocentes">
        <h3>Subir Notas</h3>
      </div>

        <div className="VSubirNotasContent">
          <div className="InfoSubNot">
            <p className="PMd">Curso:</p>
            <p className="PMd">{curso.nombre}</p>
            <p className="PMd">Grado:</p>
            <p className="PMd">{curso.grado}</p>
            <p className="PMd">Seccion:</p>
            <p className="PMd">{curso.seccion}</p>
            <p className="PMd">Nivel:</p>
            <p className="PMd">{curso.nivel}</p>
            <p className="PMd">Unidad:</p>
            <SelectComponent name={"Unidad"} options={unidades}/>
          </div>
          <div className="IndicacionesContainer">
            <p className="PMd">
              Suba notas del 0 al 20, no deje alumnos con notas en blanco{" "}
            </p>
          </div>
          <div className="ContSubNot">
            <TablaSubirNotasDocente alumnos={alumnos} competencias={competencias} />
          </div>
            
        </div>

    </div>
  );
}

export default VSubirNotasDocenteAdministrador;
