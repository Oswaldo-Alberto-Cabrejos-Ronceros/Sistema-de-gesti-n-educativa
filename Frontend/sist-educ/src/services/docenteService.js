import axiosInstance from './axiosInstance';

const API_URL = 'http://localhost:8080/api/profesores';


class DocenteService{

    getAllDocente(){
        return axiosInstance.get(API_URL);
    }
    createProfesor(profesor) {
        return axiosInstance.post(`${API_URL}/registrar`, profesor);
    }
    obtenerProfesorPorId(Id) {
        return axiosInstance.get(`${API_URL}/${Id}`);
    }
    obtenerProfesorPorDni(Dni) {
        return axiosInstance.get(`${API_URL}/${Dni}`);
    }

    updateProfesor(Id,UpdateRequest){
        return axiosInstance.put(`${API_URL}/actualizar/${Id}`,UpdateRequest);
    }

    AdminUpdateProfesor(id, profesorData) {
        return axiosInstance.put(`${API_URL}/updateAll/${id}`, profesorData);
    }
    deleteProfesor(Id){
        return axiosInstance.delete(`${API_URL}/eliminar/${Id}`);
    }
    asignarProfesor(request){
        return axiosInstance.post(`${API_URL}/asignar`,request);
    }
    desasignarProfesor(asignacionId){
        return axiosInstance.delete(`${API_URL}/desasignar/${asignacionId}`);
    }


}
export default new DocenteService();