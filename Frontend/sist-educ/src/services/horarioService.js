import axiosInstance from './axiosInstance';

const API_URL = 'http://18.231.151.214:8080/api/horarios';

class HorarioService {
    // Métodos para Alumnos
    subirHorarioAlumno(nivel, grado, seccion, archivo) {
        const formData = new FormData();
        formData.append('nivel', nivel);
        formData.append('grado', grado);
        formData.append('seccion', seccion);
        formData.append('archivo', archivo);

        return axiosInstance.post(`${API_URL}/alumno/subir`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    obtenerHorarioAlumno(nivel, grado, seccion) {
        return axiosInstance.get(`${API_URL}/alumno/nivel/${nivel}/grado/${grado}/seccion/${seccion}`);
    }

    eliminarHorarioAlumno(id) {
        return axiosInstance.delete(`${API_URL}/alumno/eliminar/${id}`);
    }

    // Métodos para Profesores
    subirHorarioProfesor(usuarioId, archivo) {
        const formData = new FormData();
        formData.append('usuarioId', usuarioId);
        formData.append('archivo', archivo);

        return axiosInstance.post(`${API_URL}/profesor/subir`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    obtenerHorarioProfesor(usuarioId) {
        return axiosInstance.get(`${API_URL}/profesor/${usuarioId}`);
    }

    eliminarHorarioProfesor(usuarioId) {
        return axiosInstance.delete(`${API_URL}/profesor/${usuarioId}`);
    }
}

export default new HorarioService();