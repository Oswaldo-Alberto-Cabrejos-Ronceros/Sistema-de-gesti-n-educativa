

import axios from "axios";

const API_URL = 'http://localhost:8080/api/notas';

// Interceptor para agregar el token a cada solicitud
axios.interceptors.request.use(
    (config) => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json"; // Establece el tipo de contenido como JSON
    return config;
    },
    (error) => {
    return Promise.reject(error);
    }
);

class NotasService{

    // Registrar una calificación
    registrarCalificacion(usuarioId, subcursoId, unidad, calificacionNumero, calificacion) {
        return axios.post(
            `${API_URL}/alumno/${usuarioId}/subcurso/${subcursoId}/unidad/${unidad}/calificacion/${calificacionNumero}`,
            calificacion,
            { headers: { "Content-Type": "application/json" } } 
        );
    }

    // Obtener notas de un alumno, subcurso y unidad específicos
    obtenerNotasPorAlumnoSubcursoYUnidad(usuarioId, subcursoId, unidad) {
    return axios.get(`${API_URL}/subcurso/${subcursoId}/unidad/${unidad}/alumno/${usuarioId}`);
    }

    // Obtener el promedio de una unidad específica
    obtenerPromedioUnidad(usuarioId, subcursoId, unidad) {
        return axios.get(`${API_URL}/alumno/${usuarioId}/subcurso/${subcursoId}/unidad/${unidad}/promedio`);
    }

    // Obtener el promedio bimestral
    obtenerPromedioBimestral(usuarioId, subcursoId, bimestre) {
        return axios.get(`${API_URL}/alumno/${usuarioId}/subcurso/${subcursoId}/bimestre/${bimestre}/promedio`);
    }

    // Obtener el promedio final del curso
    obtenerPromedioFinalCurso(usuarioId, cursoId) {
        return axios.get(`${API_URL}/alumno/${usuarioId}/curso/${cursoId}/promedioFinal`);
    }


}
export default new NotasService();