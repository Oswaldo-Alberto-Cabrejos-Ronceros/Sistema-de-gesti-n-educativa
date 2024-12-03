import axiosInstance from './axiosInstance';

const API_URL = 'http://18.231.151.214:8080/api/profesores';


class DocenteService{
    
    getAllDocente(){
        return axiosInstance.get(API_URL);
    }
    listarProfesoresPorNivel(Nivel) {
        return axiosInstance.get(`${API_URL}/listar/nivel/${Nivel}`);
    }
    createProfesor(profesor) {
        return axiosInstance.post(`${API_URL}/registrar`, profesor);
    }
    obtenerProfesorPorId(Id) {
        return axiosInstance.get(`${API_URL}/${Id}`);
    }
    buscarProfesorPorDNI(dni) {
        return axiosInstance.get(`${API_URL}/buscarPorDni`, {
            params: {
                dni: dni || '',
            },
        });
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
    obtenerAsignacionesPorProfesor(profesorId) {
        return axiosInstance.get(`${API_URL}/${profesorId}/asignaciones`);
    }    
    desasignarProfesor(asignacionId){
        return axiosInstance.delete(`${API_URL}/desasignar/${asignacionId}`);
    }


}
export default new DocenteService();