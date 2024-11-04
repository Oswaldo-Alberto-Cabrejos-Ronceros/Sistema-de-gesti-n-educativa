import axios from "axios";

const API_URL = 'http://localhost:8080/api/profesores';

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
class DocenteService{

    getAllDocente(){
        return axios.get(API_URL);
    }
    createProfesor(profesor) {
        return axios.post(`${API_URL}/registrar`, profesor);
    }
    obtenerProfesorPorId(Id) {
        return axios.get(`${API_URL}/${Id}`);
    }
    obtenerProfesorPorDni(Dni) {
        return axios.get(`${API_URL}/${Dni}`);
    }

    updateProfesor(Id,UpdateRequest){
        return axios.put(`${API_URL}/actualizar/${Id}`,UpdateRequest);
    }

    AdminUpdateProfesor(id, profesorData) {
        return axios.put(`${API_URL}/updateAll/${id}`, profesorData);
    }
    deleteProfesor(Id){
        return axios.delete(`${API_URL}/eliminar/${Id}`);
    }
    asignarProfesor(){
        return axios.post(`${API_URL}/asignar}`);
    }
    desasignarProfesor(asignacionId){
        return axios.delete(`${API_URL}/desasignar/${asignacionId}`);
    }


}
export default new DocenteService();