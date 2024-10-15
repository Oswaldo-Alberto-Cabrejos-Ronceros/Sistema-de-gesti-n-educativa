import React from "react";
import "./FormularioAgregarCurso.css";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import { RiBook2Line } from "react-icons/ri";
import TextAreaComponent from "../../../generalsComponets/TextAreaComponent/TextAreaComponent";
import { HiOutlinePencilAlt } from "react-icons/hi";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import ButtonSubtmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";

function FormularioAgregarCurso() {
    let niveloptions=["Primaria","Secundaria","Ambos"];
  return <div className="FormularioAgregarCursoContainer">
    <form action="#">
        <h3>Agregar cursos</h3>
        <div className="formularioAgregarCursoContentPrin">
            <div className="label-input-container">
            <label htmlFor="Nombre">Nombre:</label>
            <InputComponent nombre="nombre" placeholder={"Nombre"} icon={<RiBook2Line/>}/>
            </div>
            <div className="label-input-container">
            <label htmlFor="Descripcion">Descripción:</label>
            <TextAreaComponent nombre={"Descripcion"} placeholder={"Descripción"} icon={<HiOutlinePencilAlt/>}/>
            </div>
            <div className="label-input-container">
            <label htmlFor="Nivel">Nivel:</label>
            <SelectComponent options={niveloptions}/>
            </div>
            <div className="buttonSubmitCursoContainer">
                <ButtonSubtmit className="buttonSubmitCurso" nombre={"Agregar"}/>
            </div>
        </div>
    </form>
  </div>;
}

export default FormularioAgregarCurso;
