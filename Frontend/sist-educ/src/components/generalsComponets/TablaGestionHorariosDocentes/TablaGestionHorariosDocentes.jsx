
import React, { useState, useEffect } from "react";
import "./TablaGestionHorariosDocentes.css";
import HorarioService from "../../../services/horarioService";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SubirHorarioDocenteModal from "./SubirHorarioDocenteModal/SubirHorarioDocenteModal";
import PaginacionComponent from "../PaginacionComponent/PaginacionComponent";

function TablaGestionHorariosDocentes({ docentes,onHorarioAgregado }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState(null);
  const [horariosExistentes, setHorariosExistentes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Calcular items de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = docentes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Verificar si existen horarios para cada docente
  useEffect(() => {
    const verificarHorarios = async () => {
      const resultados = {};
      for (const docente of docentes) {
        try {
          const response = await HorarioService.obtenerHorarioProfesor(docente.usuarioId);
          resultados[docente.usuarioId] = response.data ? "Existente" : "No existente";
        } catch (error) {
          resultados[docente.usuarioId] = "No existente";
        }
      }
      setHorariosExistentes(resultados);
    };
    verificarHorarios();
  }, [docentes]);

  const handleAddClick = (docente) => {
    setSelectedDocente(docente);
    setShowAddModal(true);
  };

  return (
    <div className="TablaGestionDocentesContainer">
      {docentes.length === 0 ? (
        <div className="TablaGestionDocentesVerDocEmpty">
          <h3>No hay docentes registrados</h3>
        </div>
      ) : (
        <div>
          <table className="TableGestionDocentes">
            <thead>
              <tr>
                <th>Dni</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Especialidad</th>
                <th>Nivel</th>
                <th>Agregar</th>
                <th>Existe</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((docente) => (
                <tr key={docente.usuarioId}>
                  <td>{docente.dni}</td>
                  <td>{docente.nombre}</td>
                  <td>{docente.apellido}</td>
                  <td>{docente.especialidad}</td>
                  <td>{docente.nivel}</td>
                  <td>
                    <PrimaryButton
                      onClick={() => handleAddClick(docente)}
                      nombre="Agregar"
                    />
                  </td>
                  <td>{horariosExistentes[docente.usuarioId] || "Verificando..."}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginacionComponent
            totalItems={docentes.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      <SubirHorarioDocenteModal
        show={showAddModal}
        docente={selectedDocente}
        onClose={() => setShowAddModal(false)}
        onHorarioAgregado={onHorarioAgregado}
      />
    </div>
  );
}

export default TablaGestionHorariosDocentes;