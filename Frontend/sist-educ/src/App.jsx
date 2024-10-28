

import "./App.css";
import VInicioSesion from "./components/v-iniciosesion/VInicioSesion/VInicioSesion";
import VEstudiante from "./components/VEstudiante/VEstudiante";
import VDocente from "./components/VDocente/VDocente";
import VAdministrador from "./components/VAdministrador/VAdministrador";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Navigate to={"/login"}/>} />
        <Route path="/login" element={<VInicioSesion/>}/>
        <Route path="/estudiante/*" element={<VEstudiante/>}/>
        <Route path="/docente/*" element={<VDocente/>}/>
        <Route path="/administrador/*" element={<VAdministrador/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
