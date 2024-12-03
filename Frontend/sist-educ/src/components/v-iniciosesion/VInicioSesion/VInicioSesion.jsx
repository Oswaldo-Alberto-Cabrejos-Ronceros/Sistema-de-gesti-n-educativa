import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VInicioSesion.css";
import { FaRegUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Logo from '../../../../public/logo.jpg'


function VInicioSesion({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Limpiar mensaje de error al intentar iniciar sesión de nuevo

    try {
      const response = await axios.post(
        "http://18.231.151.214:8080/auth/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true, // Asegura que las cookies HTTP-only sean aceptadas
        }
      );

      const jwtToken = response.data.jwt;

      // Guardar el token en sessionStorage
      sessionStorage.setItem("jwtToken", jwtToken);

      // Decodificar el JWT manualmente para obtener el rol
      const base64Url = jwtToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = JSON.parse(window.atob(base64));
      const role = jsonPayload.authorities;

      // Guardar los demás datos del usuario en sessionStorage
      sessionStorage.setItem(
        "userData",
        JSON.stringify({
          usuarioId: response.data.usuarioId,
          nombre: response.data.nombre,
          apellido: response.data.apellido,
          dni: response.data.dni,
          telefono: response.data.telefono,
          codigo: response.data.codigo,
          rol: response.data.rol,
          grado: response.data.grado,
          seccion: response.data.seccion,
          nivel: response.data.nivel,
          especialidad: response.data.especialidad,
          debeCambiarPassword: response.data.debeCambiarPassword,
        })
      );
      if (onLoginSuccess) {
        onLoginSuccess(response.data.debeCambiarPassword);
      }

      // Redirigir según el rol
      if (role === "ADMIN") {
        navigate("/administrador");
      } else if (role === "PROFESOR") {
        navigate("/docente");
      } else if (role === "STUDENT") {
        navigate("/estudiante");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Credenciales incorrectas, intente nuevamente");

      // Ocultar el mensaje de error después de 3 segundos
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };


  return (
    <div className="Container-Prin">
      <div className="Content-1">
        <img
          src={Logo}
          alt="Logo del Colegio"
        />
        <h3>Su nueva plataforma virtual</h3>
        <form onSubmit={handleLogin}>
          <p className="PMd">Ingrese sus datos</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="input-user-container">
            <input
              type="text"
              placeholder="Ingrese usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="IconInicioSesionContainer">
              <FaRegUser />
            </div>
          </div>
          <div className="input-user-container">
            <input
              type={showPassword ? "text" : "password"} 
              placeholder="Ingrese contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="IconInicioSesionContainerPassword"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
          </div>
          <div className="btnContainer">
            <button type="submit">Iniciar Sesion</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VInicioSesion;
