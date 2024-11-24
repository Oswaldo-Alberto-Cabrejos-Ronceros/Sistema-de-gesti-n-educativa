import axiosInstance from './axiosInstance';

const API_URL = 'http://localhost:8080/api/notas';


class NotasService{

    // Registrar una calificación
    registrarCalificacion(usuarioId, subcursoId, unidad, calificacionNumero, calificacion) {
        return axiosInstance.post(
            `${API_URL}/alumno/${usuarioId}/subcurso/${subcursoId}/unidad/${unidad}/calificacion/${calificacionNumero}`,
            calificacion,
            { headers: { "Content-Type": "application/json" } } 
        );
    }

    // Obtener notas de un alumno, subcurso y unidad específicos
    obtenerNotasPorAlumnoSubcursoYUnidad(usuarioId, subcursoId, unidad) {
    return axiosInstance.get(`${API_URL}/subcurso/${subcursoId}/unidad/${unidad}/alumno/${usuarioId}`);
    }

    // Obtener el promedio de una unidad específica
    obtenerPromedioUnidad(usuarioId, subcursoId, unidad) {
        return axiosInstance.get(`${API_URL}/alumno/${usuarioId}/subcurso/${subcursoId}/unidad/${unidad}/promedio`);
    }

    // Obtener el promedio bimestral
    obtenerPromedioBimestral(usuarioId, subcursoId, bimestre) {
        return axiosInstance.get(`${API_URL}/alumno/${usuarioId}/subcurso/${subcursoId}/bimestre/${bimestre}/promedio`);
    }

    // Obtener el promedio final del curso
    obtenerPromedioFinalCurso(usuarioId, cursoId) {
        return axiosInstance.get(`${API_URL}/alumno/${usuarioId}/curso/${cursoId}/promedioFinal`);
    }


}
export default new NotasService();