import React from "react";
import "./CardFormularioHorarioDocente.css";
import SearchComponent from "../SearchComponent/SearchComponent";
import InputComponent from "../InputComponent/InputComponent";
import { TbUserEdit } from "react-icons/tb";
import ButtonSubtmit from "../ButtonSubmit/ButtonSubtmit";
import { FaUpload } from "react-icons/fa6";

function CardFormularioHorarioDocente() {
  return (
    <div className="CardFormularioHorarioDocenteContainer">
      <form>
        <h3>Agregar Horario</h3>
        <div className="CardFormularioHorarioDocenteContent">
          <div className="label-input-container-search">
          <label htmlFor="search">Buscar</label>
            <SearchComponent
              nombre={"docente"}
              placeholder={"Busca a un docente"}
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="Apellidos">Apellidos</label>
            <InputComponent
              nombre="apellido"
              placeholder="Ingrese Apellidos"
              icon={<TbUserEdit />}
              type="text"
              disable={true}
            />
          </div>
          <div className="label-input-container">
          <label htmlFor="Nombres">Nombres</label>
          <InputComponent
              nombre="nombres"
              placeholder="Ingrese Nombres"
              icon={<TbUserEdit />}
              type="text"
              disable={true}
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="Imagen">Imagen</label>
            <InputComponent
              type={"file"}
              nombre={"imagen"}
              icon={<FaUpload />}
            />
          </div>
        </div>
        <div className='buttonSubmitHorarioDocenteContainer'>
            <ButtonSubtmit className="buttonSubmitHorarioDocente" nombre={"Agregar"}/>
        </div>
      </form>
    </div>
  );
}

export default CardFormularioHorarioDocente;
