import React from "react";
import "./FormularioAgregarDocente.css";
import ButtonSubtmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import { LiaIdCardSolid } from "react-icons/lia";
import { TbUserEdit } from "react-icons/tb";
import { FiSmartphone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

function FormularioAgregarDocente() {
  let optionsNivel = ["Primaria", "Secundaria", "Ambos"];
  return (
    <div className="FormularioAgregarDocenteContainer">
      <form action="#">
        <h3>Agregar Docente</h3>
        <div className="FormularioAgregarDocentesContentPrin">
          <div className="label-input-container-docentes">
            <label htmlFor="Dni">Dni:</label>
            <InputComponent
              nombre={"dni"}
              placeholder={"Ingrese DNI"}
              icon={<LiaIdCardSolid />}
              type={"text"}
            />
          </div>
          <div className="label-input-container-docentes">
            <label htmlFor="Apellidos">Apellidos:</label>
            <InputComponent
              nombre={"apellidos"}
              placeholder={"Ingrese Apellidos"}
              icon={<TbUserEdit />}
              type={"text"}
            />
          </div>
          <div className="label-input-container-docentes">
            <label htmlFor="Nombres">Nombres:</label>
            <InputComponent
              nombre={"nombres"}
              placeholder={"Ingrese Nombres"}
              icon={<TbUserEdit />}
              type={"text"}
            />
          </div>
          <div className="label-input-container-docentes">
            <label htmlFor="Nombres">Celular:</label>
            <InputComponent
              nombre={"celular"}
              placeholder={"Ingrese Celular"}
              icon={<FiSmartphone />}
              type={"tel"}
            />
          </div>
          <div className="label-input-container-docentes">
            <label htmlFor="Correo">Correo:</label>
            <InputComponent
              nombre={"correo"}
              placeholder={"Ingrese Correo"}
              icon={<MdOutlineEmail />}
              type={"email"}
            />
          </div>
          <div className="label-input-container-docentes">
        <label htmlFor="Nivel">Nivel:</label>
        <SelectComponent name={"nivel"} options={optionsNivel} /></div>
        </div>
        <div className="butonSubmitDocentesContainer">
        <ButtonSubtmit className="buttonSubmitDocentes" nombre={"Agregar"} /></div>
      </form>
    </div>
  );
}

export default FormularioAgregarDocente;
