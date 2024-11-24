import React, { useState } from "react";
import "./CardFormularioHorarioDocente.css";
import SearchComponent from "../SearchComponent/SearchComponent";
import InputComponent from "../InputComponent/InputComponent";
import { TbUserEdit } from "react-icons/tb";
import ButtonSubtmit from "../ButtonSubmit/ButtonSubtmit";
import { FaUpload } from "react-icons/fa6";
import ConfirmationModal from "../../VGestionUsuarios/Modals/ConfirmacionModal";

function CardFormularioHorarioDocente() {
  const [formData, setFormData] = useState({
    idDocente: "1",
    horario: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeHorario=(e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };


  const [errorMessages, setErrorMessages] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);



  const showErrorMessage = (field, message) => {
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: message }));
    setTimeout(() => {
      setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }, 1300);
  };

  const showConfirmationMessage = (message, duration = 1500) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), duration);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if (formData.idDocente === "" ) {
      showErrorMessage("idDocente", "Debe seleccionar un docente");
      return;
    }
    if (formData.horario === null) {
      showErrorMessage("horario", "Debe subir una imagen");
      return;
    }
    try{
      showConfirmationMessage("Horario agregado correctamente", 1500);
      console.log(formData)
      setTimeout(() => {
        setFormData({
          idDocente: "",
          horario: null,
        });
      }, 1500); 
    } catch(error){
      console.error("Error al agregar horario:", error);
      showConfirmationMessage("Ya existe el horario ", 1500);
    }
  }


  return (
    <div className="CardFormularioHorarioDocenteContainer">
      <ConfirmationModal show={showConfirmation} message={confirmationMessage} />
      <form onSubmit={handleSubmit}>
        <h3>Agregar Horario</h3>
        <div className="CardFormularioHorarioDocenteContent">
          <div className="label-input-container-search">
            <label htmlFor="search">Buscar</label>
            <SearchComponent
              nombre={"docente"}
              placeholder={"Busca a un docente"}
            />
          </div>
          {errorMessages.idDocente && <p className="error-message">{errorMessages.idDocente}</p>}
          <div className="InputId">
          <InputComponent 
              nombre="idDocente"
              placeholder="Id"
              type="text"
              disable={true}
              onChange={handleChange}
              value={formData.idDocente}
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
              nombre={"horario"}
              icon={<FaUpload />}
              onChange={handleChangeHorario}
              accept="image/*"
            />
          </div>
          {errorMessages.horario && <p className="error-message">{errorMessages.horario}</p>}
        </div>
        <div className="buttonSubmitHorarioDocenteContainer">
          <ButtonSubtmit
            className="buttonSubmitHorarioDocente"
            nombre={"Agregar"}
          />
        </div>
      </form>
    </div>
  );
}

export default CardFormularioHorarioDocente;
