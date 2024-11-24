import axiosInstance from './axiosInstance';

const API_URL = 'http://localhost:8080/api/alumnos';


class AlumnoService{
    getAllAlumno(){
        return axiosInstance.get(API_URL);
    }
    obtenerAlumnosPorGradoYSubcurso(subcursoId,grado) {
        return axiosInstance.get(`${API_URL}/list/subcurso/${subcursoId}/grado/${grado}`);
    }
    obtenerNotasPorAlumno(Id) {
        return axiosInstance.get(`${API_URL}/${Id}/notas`);
    }
    obtenerNotasPorAlumnoYSubcurso(Id,subcursoId) {
        return axiosInstance.get(`${API_URL}/${Id}/subcurso/${subcursoId}/notas`);
    }
    createAlumno(alumno){
        return axiosInstance.post(`${API_URL}/registrar`,alumno);
    }
    getClienteByDni(clienteDni){
        return axiosInstance.get(`${API_URL}/dni/${clienteDni}`);
    }
    updateAlumno(Id,UpdateRequest){
        return axiosInstance.put(`${API_URL}/update/${Id}`,UpdateRequest);
    }
    AdminUpdateAlumno(id, alumnoData) {
        return axiosInstance.put(`${API_URL}/updateAll/${id}`, alumnoData);
    }
    deleteAlumno(Id){
        return axiosInstance.delete(`${API_URL}/eliminar/${Id}`);
    }

    //cuadro honor
    // Nuevo método para listar alumnos con el mayor promedio por grado y nivel
    listarAlumnosPorGradoNivelConMayorPromedio(grado, nivel) {
        return axiosInstance.get(`${API_URL}/grado/${grado}/nivel/${nivel}/honor`);
    }
}
export default new AlumnoService();