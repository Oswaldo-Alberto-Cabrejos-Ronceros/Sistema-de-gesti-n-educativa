import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VInicioSesion.css";

function VInicioSesion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: username,
        password: password,
      });

      const jwtToken = response.data.jwt;

      // Guardar el token en sessionStorage
      sessionStorage.setItem("jwtToken", jwtToken);

      // Guardar el resto de los datos del usuario en sessionStorage
      sessionStorage.setItem("userData", JSON.stringify({
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
      }));

      // Redirigir según el rol
      const role = response.data.rol;
      if (role === "ADMIN") {
        navigate("/administrador");
      } else if (role === "PROFESOR") {
        navigate("/docente");
      } else if (role === "STUDENT") {
        navigate("/estudiante");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="Container-Prin">
      <div className="Content-1">
        <img
          src="https://scontent.fpio2-1.fna.fbcdn.net/v/t1.6435-9/119931467_102934771572270_2851731201534669293_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHb7GRpree8ylSIOsKgKaM8KEcbqGJa7QcoRxuoYlrtB0izSoKDIR4wLph5U9vL31vEsiVnDCF5YVSEPdX8WtfS&_nc_ohc=ylnQQeI_NAcQ7kNvgFfEdkP&_nc_ht=scontent.fpio2-1.fna&_nc_gid=AsQD5Xn6P_RDV_H7S6syKze&oh=00_AYDlwHGlZR4vbCgJsR2OdIJxaJqThnI3bsA8Jm-5XQjzCw&oe=67456050"
          alt="Logo del Colegio"
        />
        <h3>Su nueva plataforma virtual</h3>
        <form onSubmit={handleLogin}>
          <p className="PMd">Ingrese sus datos</p>
          <div className="input-user-container">
            <input
              type="text"
              placeholder="Ingrese usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <svg
              width="23"
              height="26"
              viewBox="0 0 23 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG PATH */}
            </svg>
          </div>
          <div className="input-user-container">
            <input
              type="password"
              placeholder="Ingrese contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
            />
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG PATH */}
            </svg>
          </div>
          <a href="#">Olvidaste tu contraseña</a>
          <div className="btnContainer">
            <button type="submit">Iniciar Sesion</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VInicioSesion;