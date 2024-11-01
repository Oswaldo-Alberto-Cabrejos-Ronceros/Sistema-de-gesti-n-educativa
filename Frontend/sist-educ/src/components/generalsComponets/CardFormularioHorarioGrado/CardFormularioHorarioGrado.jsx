import React from "react";
import "./CardFormularioHorarioGrado.css";
import SelectComponent from "../SelectComponent/SelectComponent";
import InputComponent from "../InputComponent/InputComponent";
import { FaUpload } from "react-icons/fa6";
import ButtonSubtmit from "../ButtonSubmit/ButtonSubtmit";

function CardFormularioHorarioGrado() {
  const optionsNivel = ["Primaria", "Secundaria"];
  const optionsGrado = ["1er", "2do", "3er", "4to", "5to"];
  const optionsSeccion = ["A", "B"];
  return (
    <div className="CardFormularioHorarioGradoContainer">
      <form>
        <h3>Agregar Horario</h3>
        <div className="CardFormularioHorarioGradoContent">
          <div className="label-input-container">
            <label htmlFor="Nivel">Nivel</label>
            <SelectComponent name={"nivel"} options={optionsNivel} />
          </div>
          <div className="label-input-container">
            <label htmlFor="Grado">Grado</label>
            <SelectComponent name={"grado"} options={optionsGrado} />
          </div>
          <div className="label-input-container">
            <label htmlFor="Seccion">Seccion</label>
            <SelectComponent name={"seccion"} options={optionsSeccion} />
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
        <div className="buttonSubmitHorarioContainer">
          <ButtonSubtmit className="buttonSubmirHorario" nombre={"Agregar"} />
        </div>
      </form>
    </div>
  );
}

export default CardFormularioHorarioGrado;
