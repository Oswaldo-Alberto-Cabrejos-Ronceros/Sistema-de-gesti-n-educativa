import React, { useState } from "react";
import DocenteService from "../../../../services/docenteService";
import "./FormularioAgregarDocente.css";
import ButtonSubtmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import InputComponent from "../../../generalsComponets/InputComponent/InputComponent";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import { LiaIdCardSolid } from "react-icons/lia";
import { TbUserEdit } from "react-icons/tb";
import { FiSmartphone } from "react-icons/fi";
import { GiDiploma } from "react-icons/gi";

function FormularioAgregarDocente({onDocenteAdded}) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    especialidad: "",
    grado: "",
    nivel: "",
  });
  const optionsNivel = ["PRIMARIA", "SECUNDARIA"];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("Docente a agregar:", formData);
    e.preventDefault();
    try {
      await DocenteService.createProfesor(formData);
      alert("Docente agregado exitosamente");
      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        especialidad: "", 
        grado: "",
        nivel: "",
      });
      onDocenteAdded(); // Llama a la función para actualizar la lista de estudiantes
    } catch (error) {
      console.error("Error al agregar docente:", error);
      alert("Error al agregar el docente. Por favor, intenta de nuevo.");
    }
  };
  return (
    <div className="FormularioAgregarDocenteContainer">
      <form onSubmit={handleSubmit}>
        <h3>Agregar Docente</h3>
        <div className="FormularioAgregarDocentesContentPrin">
          <div className="label-input-container-docentes">
            <label htmlFor="Dni">Dni:</label>
            <InputComponent
              nombre="dni"
              placeholder="Ingrese DNI"
              icon={<LiaIdCardSolid />}
              type="text"
              value={formData.dni}
              onChange={handleChange}
            />
          </div>
          <div className="label-input-container-docentes">
            <label htmlFor="Apellidos">Apellidos:</label>
            <InputComponent
              nombre="apellido"
              placeholder="Ingrese Apellidos"
              icon={<TbUserEdit />}
              type="text"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
          <div className="label-input-container-docentes">
            <label htmlFor="Nombres">Nombres:</label>
            <InputComponent
              nombre="nombre"
              placeholder="Ingrese Nombres"
              icon={<TbUserEdit />}
              type="text"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="label-input-container-docentes">
            <label htmlFor="celular">Celular:</label>
            <InputComponent
              nombre="telefono"
              placeholder="Ingrese Celular"
              icon={<FiSmartphone />}
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
          <div className="label-input-container-docentes">
            <label htmlFor="especilidad">Especilidad:</label>
            <InputComponent
              nombre="especialidad"
              placeholder="Ingrese Especilidad"
              icon={<GiDiploma />}
              type="text"
              value={formData.especialidad}
              onChange={handleChange}
            />
          </div>
          <div className="label-input-container-docentes">
        <label htmlFor="Nivel">Nivel:</label>
        <SelectComponent
              name="nivel"
              options={optionsNivel}
              value={formData.nivel}
              onChange={handleChange}
            /></div>
        </div>
        <div className="butonSubmitDocentesContainer">
        <ButtonSubtmit className="buttonSubmitDocentes" nombre={"Agregar"} /></div>
      </form>
    </div>
  );
}

export default FormularioAgregarDocente;
