import React, { useEffect, useState } from "react";
import './InfoUser.css'
import AdminService from "../../../services/adminService";
import AlumnoService from "../../../services/alumnoService";
import DocenteService from "../../../services/docenteService";
import ConfirmationModal from "../../VGestionUsuarios/Modals/ConfirmacionModal";
import ICONO from "../../../../public/descarga.png"
import { useLocation } from "react-router-dom";
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaBook, FaGraduationCap, FaSave, FaLock } from "react-icons/fa";

function InfoUser() {
  const location = useLocation();
  const {cambioContraseña = false} = location.state || {};
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(cambioContraseña);
  const [editableUser, setEditableUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditableUser(parsedUser);
    }
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "nombre" || name === "apellido") {
      if (!value.trim()) error = "Este campo no puede estar vacío.";
    } else if (name === "dni") {
      if (!/^\d{8}$/.test(value)) error = "El DNI debe tener 8 dígitos.";
    } else if (name === "telefono") {
      if (!/^9\d{8}$/.test(value)) error = "El teléfono debe empezar con 9 y tener 9 dígitos.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSave = () => {
    const id = user.usuarioId;
    const updateData = { ...editableUser };
    if (editableUser.nuevaContraseña) {
      updateData.password = editableUser.nuevaContraseña;
    }

    // Verificar si hay errores antes de guardar
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      setModalMessage("Por favor, corrige los errores antes de guardar.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1500); // Cerrar el modal después de 3 segundos
      return;
    }


    const saveUserData = (service, successMessage) => {
      service(id, updateData)
        .then(() => {
          // Actualizar `debeCambiarPassword` a false
          const updatedUser = { ...editableUser, debeCambiarPassword: false };
          setUser(updatedUser);
          sessionStorage.setItem("userData", JSON.stringify(updatedUser));

          // Cerrar modo de edición y mostrar mensaje de éxito
          setEditMode(false);
          setModalMessage(successMessage);
          setShowModal(true);
          setTimeout(() => setShowModal(false), 1500); 
        })
        .catch((error) => {
          setModalMessage("Error al actualizar la información. Intenta nuevamente.");
          setShowModal(true);
          setTimeout(() => setShowModal(false), 1500); 
        });
    };


    // Determina el servicio a usar basado en el rol del usuario
    if (user.rol === "ADMIN") {
      saveUserData(AdminService.updateAdmin, "Información de administrador actualizada con éxito");
    } else if (user.rol === "STUDENT") {
      saveUserData(AlumnoService.updateAlumno, "Información del estudiante actualizada con éxito");
    } else if (user.rol === "PROFESOR") {
      saveUserData(DocenteService.updateProfesor, "Información del profesor actualizada con éxito");
    }
  };

  if (!user) return <p>Cargando información del usuario...</p>;

  return (
    <div className="Container">
      <div className="Menu">
        <button onClick={() => setEditMode(false)}>Información personal</button>
        <button onClick={() => setEditMode(true)}>Editar datos</button>
      </div>

      <div className="InfoUserContainer">
        {!editMode ? (
          <div className="InfoSection">
            <h2>Información básica</h2>
            <p className="InfoDescription">
              Es posible que cierta información sea visible para otras personas que usan los servicios de la plataforma.
            </p>
            <img className="UserAvatar" src={ICONO} alt="Foto de perfil del usuario" />
            <div className="InfoUserDetails">
              <div className="InfoRow">
                <FaUser /> <label>Nombre:</label>
                <p>{user.nombre} {user.apellido}</p>
              </div>
              <div className="InfoRow">
                <FaIdCard /> <label>DNI:</label>
                <p>{user.dni}</p>
              </div>
              <div className="InfoRow">
                <FaPhone /> <label>Teléfono:</label>
                <p>{user.telefono}</p>
              </div>
              {user.rol === "ADMIN" && (
                <div className="InfoRow">
                  <FaEnvelope /> <label>Correo:</label>
                  <p>{user.codigo}</p>
                </div>
              )}
              {user.rol === "STUDENT" && (
                <>
                  <div className="InfoRow">
                    <FaEnvelope /> <label>Codigo:</label>
                    <p>{user.codigo}</p>
                  </div>
                  <div className="InfoRow">
                    <FaGraduationCap /> <label>Nivel:</label>
                    <p>{user.nivel}</p>
                  </div>
                  <div className="InfoRow">
                    <FaGraduationCap /> <label>Grado y Seccion:</label>
                    <p>{user.grado} Grado - "{user.seccion}"</p>
                  </div>
                </>
              )}
              {user.rol === "PROFESOR" && (
                <>
                  <div className="InfoRow">
                    <FaEnvelope /> <label>Codigo:</label>
                    <p>{user.codigo}</p>
                  </div>
                  <div className="InfoRow">
                    <FaBook /> <label>Especialidad:</label>
                    <p>{user.especialidad}</p>
                  </div>
                  <div className="InfoRow">
                    <FaGraduationCap /> <label>Nivel:</label>
                    <p>{user.nivel}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="EditSection">
            <h2>Editar información</h2>
            <div className="InfoUserDetails">
              <div className="InfoRow">
                <FaUser /> <label>Nombre:</label>
                <input type="text" name="nombre" value={editableUser.nombre} onChange={handleEditChange} disabled={user.rol !== "ADMIN"} />
                {errors.nombre && <p className="error-message">{errors.nombre}</p>}
              </div>
              <div className="InfoRow">
                <FaUser /> <label>Apellido:</label>
                <input type="text" name="apellido" value={editableUser.apellido} onChange={handleEditChange} disabled={user.rol !== "ADMIN"} />
                {errors.apellido && <p className="error-message">{errors.apellido}</p>}
              </div>
              <div className="InfoRow">
                <FaIdCard /> <label>DNI:</label>
                <input type="text" name="dni" value={editableUser.dni} onChange={handleEditChange} disabled={user.rol !== "ADMIN"} />
                {errors.dni && <p className="error-message">{errors.dni}</p>}
              </div>
              <div className="InfoRow">
                <FaPhone /> <label>Teléfono:</label>
                <input type="text" name="telefono" value={editableUser.telefono} onChange={handleEditChange} />
                {errors.telefono && <p className="error-message">{errors.telefono}</p>}
              </div>
              {user.rol === "ADMIN" && (
                <>
                  <div className="InfoRow">
                    <FaEnvelope /> <label>Correo:</label>
                    <input type="text" name="codigo" value={editableUser.codigo} onChange={handleEditChange} />
                  </div>
                  <div className="InfoRow">
                    <FaLock /> <label>Contraseña:</label>
                    <input type="password" name="nuevaContraseña" onChange={handleEditChange} placeholder="Ingrese nueva contraseña" />
                  </div>
                </>
              )}
              {["STUDENT", "PROFESOR"].includes(user.rol) && (
                <div className="InfoRow">
                  <FaLock /> <label>Contraseña:</label>
                  <input type="password" name="nuevaContraseña" onChange={handleEditChange} placeholder="Ingrese nueva contraseña" />
                </div>
              )}
              <button className="SaveButton" onClick={handleSave}><FaSave /> Guardar</button>
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal show={showModal} message={modalMessage} />
    </div>
  );
}

export default InfoUser;