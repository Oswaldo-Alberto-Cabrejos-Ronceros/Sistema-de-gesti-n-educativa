import axios from "axios";

const API_URL = 'http://localhost:8080/api/alumnos';

// Interceptor para agregar el token a cada solicitud
axios.interceptors.request.use(
    (config) => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
    },
    (error) => {
    return Promise.reject(error);
    }
);
class AlumnoService{
    getAllAlumno(){
        return axios.get(API_URL);
    }
    obtenerAlumnosPorGradoYSubcurso(subcursoId,grado) {
        return axios.get(`${API_URL}/list/subcurso/${subcursoId}/grado/${grado}`);
    }
    obtenerNotasPorAlumno(Id) {
        return axios.get(`${API_URL}/${Id}/notas`);
    }
    obtenerNotasPorAlumnoYSubcurso(Id,subcursoId) {
        return axios.get(`${API_URL}/${Id}/subcurso/${subcursoId}/notas`);
    }
    createAlumno(alumno){
        return axios.post(`${API_URL}/registrar`,alumno);
    }
    getClienteByDni(clienteDni){
        return axios.get(`${API_URL}/dni/${clienteDni}`);
    }
    updateAlumno(Id,UpdateRequest){
        return axios.put(`${API_URL}/update/${Id}`,UpdateRequest);
    }
    AdminUpdateAlumno(id, alumnoData) {
        return axios.put(`${API_URL}/updateAll/${id}`, alumnoData);
    }
    deleteAlumno(Id){
        return axios.delete(`${API_URL}/eliminar/${Id}`);
    }

    //cuadro honor
    // Nuevo método para listar alumnos con el mayor promedio por grado y nivel
    listarAlumnosPorGradoNivelConMayorPromedio(grado, nivel) {
        return axios.get(`${API_URL}/grado/${grado}/nivel/${nivel}/honor`);
    }
}
export default new AlumnoService();