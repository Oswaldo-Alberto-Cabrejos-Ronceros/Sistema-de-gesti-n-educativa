import "./App.css";
import VInicioSesion from "./components/v-iniciosesion/VInicioSesion/VInicioSesion";
import VEstudiante from "./components/VEstudiante/VEstudiante";
import VDocente from "./components/VDocente/VDocente";
import VAdministrador from "./components/VAdministrador/VAdministrador";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRouter";
import VAccesoDenegado from "./components/VAccesoDenegado/VAccesoDenegado";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<VInicioSesion />} />
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
          <Route path="*" element={<VAccesoDenegado/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
