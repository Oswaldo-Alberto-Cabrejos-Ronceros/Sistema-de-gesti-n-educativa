import React from "react";
import "./FormularioAgregarEstudiante.css";
import ButtonSubtmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import { LiaIdCardSolid } from "react-icons/lia";
import { TbUserEdit } from "react-icons/tb";
import { FiSmartphone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";

function FormularioAgregarEstudiante() {
  let optionsNivel = ["Primaria", "Secundaria"];
  let optionsGrado = ["1er", "2do", "3er", "4to", "5to"];
  let optionsSeccion = ["Unica", "A", "B"];
  return (
    <div className="FormularioAgregarEstudianteContainer">
      <form action="#">
        <h3>Agregar Estudiante:</h3>
        <div className="FormularioAgregarEstudianteContentPrin">
        <div className="label-input-container">
          <label htmlFor="Dni">Dni:</label>
          <InputComponent
            nombre={"dni"}
            placeholder={"Ingrese DNI"}
            icon={<LiaIdCardSolid />}
            type={"text"}
          />
        </div>
        <div className="label-input-container">
        <label htmlFor="Apellidos">Apellidos:</label>
        <InputComponent
          nombre={"apellidos"}
          placeholder={"Ingrese Apellidos"}
          icon={<TbUserEdit />}
          type={"text"}
        />
        </div>
        <div className="label-input-container">
        <label htmlFor="Nombres">Nombres:</label>
        <InputComponent
          nombre={"nombres"}
          placeholder={"Ingrese Nombres"}
          icon={<TbUserEdit />}
          type={"text"}
        /></div>
        <div className="label-input-container">
        <label htmlFor="Nombres">Celular:</label>
        <InputComponent
          nombre={"celular"}
          placeholder={"Ingrese Celular"}
          icon={<FiSmartphone />}
          type={"tel"}
        /></div>
        <div className="label-input-container">
        <label htmlFor="Correo">Correo:</label>
        <InputComponent
          nombre={"correo"}
          placeholder={"Ingrese Correo"}
          icon={<MdOutlineEmail />}
          type={"email"}
        /></div>
        <div className="label-input-container">
        <label htmlFor="Nivel">Nivel:</label>
        <SelectComponent name={"nivel"} options={optionsNivel} /></div>
        <div className="label-input-container">
        <label htmlFor="Grado">Grado:</label>
        <SelectComponent name={"grado"} options={optionsGrado} /></div>
        <div className="label-input-container">
        <label htmlFor="Sección">Sección:</label>
        <SelectComponent name={"seccion"} options={optionsSeccion} /></div>
        </div>
        <div className="butonSubmitEstudiantesContainer">
        <ButtonSubtmit className="buttonSubmitEstudiantes" nombre={"Agregar"} /></div>
      </form>
    </div>
  );
}

export default FormularioAgregarEstudiante;
