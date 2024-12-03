
import "./App.css";
import React, { useState, useEffect } from "react";
import VInicioSesion from "./components/v-iniciosesion/VInicioSesion/VInicioSesion";
import VEstudiante from "./components/VEstudiante/VEstudiante";
import VDocente from "./components/VDocente/VDocente";
import VAdministrador from "./components/VAdministrador/VAdministrador";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRouter";
import VAccesoDenegado from "./components/VAccesoDenegado/VAccesoDenegado";
import AlertaCambioPassword from "./components/v-iniciosesion/VInicioSesion/AlertaCambioPassword";


function App() {

  const [debeCambiarPassword, setDebeCambiarPassword] = useState(false);
  const [rol,setRol]=useState("");

  // Mantener la alerta visible mientras debeCambiarPassword sea true
  useEffect(() => {
    const checkDebeCambiarPassword = () => {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      setDebeCambiarPassword(userData?.debeCambiarPassword || false);
      setRol(userData.rol);
    };
  
    // Escuchar cambios en sessionStorage
    const interval = setInterval(checkDebeCambiarPassword, 1000);
  
    return () => clearInterval(interval); // Limpiar intervalo cuando el componente se desmonta
  }, []);
  


  return (
    <>

      <BrowserRouter>
        {/* Alerta global */}
        <AlertaCambioPassword
          mostrar={debeCambiarPassword}
          onCerrar={() => setDebeCambiarPassword(false)}
          rol={rol}
        />
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<VInicioSesion
            onLoginSuccess={(debeCambiar) => setDebeCambiarPassword(debeCambiar)} />} />
          {/*Rutas Proteguidas*/}
          <Route
            path="/estudiante/*"
            element={
              <ProtectedRoute requiredRole={"STUDENT"}>
                <VEstudiante />
              </ProtectedRoute>
            }
          />
          <Route
            path="/docente/*"
            element={
              <ProtectedRoute requiredRole={"PROFESOR"}>
                <VDocente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administrador/*"
            element={
              <ProtectedRoute requiredRole={"ADMIN"}>
                <VAdministrador />
              </ProtectedRoute>
            }
          />
          <Route path="/acceso-denegado" element={<VAccesoDenegado />} />
          <Route path="*" element={<VAccesoDenegado />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


