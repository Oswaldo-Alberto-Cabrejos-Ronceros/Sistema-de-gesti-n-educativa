import React from "react";
import "./FormularioAgregarSubCurso.css";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import { RiBook2Line } from "react-icons/ri";
import TextAreaComponent from "../../../generalsComponets/TextAreaComponent/TextAreaComponent";
import { HiOutlinePencilAlt } from "react-icons/hi";
import ButtonSubtmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";

function FormularioAgregarSubCurso() {
  let cursooptions = ["Matematicas", "Comunicacion", "Personal Social"];
  let docenteoptions = [
    "Maurtua Lopez, Antonio Jose",
    "Rodriguez Saavedra, Paolo Christian",
  ];
  return (
    <div className="FormularioAgregarSubCursoContainer">
      <form action="#">
        <h3>Agregar SubCurso</h3>
        <div className="formularioAgregarSubCursoContentPrin">
          <div className="label-input-container">
            <label htmlFor="Curso">Curso:</label>
            <SelectComponent options={cursooptions} />
          </div>
          <div className="label-input-container">
            <label htmlFor="Nombre">Nombre:</label>
            <InputComponent
              nombre="nombre"
              placeholder={"Nombre"}
              icon={<RiBook2Line />}
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="Descripcion">Descripción:</label>
            <TextAreaComponent
              nombre={"Descripcion"}
              placeholder={"Descripción"}
              icon={<HiOutlinePencilAlt />}
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="Docente">Docente:</label>
            <SelectComponent options={docenteoptions} />
          </div>
          <div className="buttonSubmitSubCursoContainer">
            <ButtonSubtmit className="buttonSubmitCurso" nombre={"Agregar"} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormularioAgregarSubCurso;
