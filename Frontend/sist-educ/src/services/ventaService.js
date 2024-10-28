import axios from "axios";

const API_URL = 'http://localhost:8080/api/ventas';

class VentaService{

    getAllVentas(){
        return axios.get(API_URL);
    }
    guardarVenta(venta){
        return axios.post(API_URL,venta)
    }
    getVentaById(id){
        return axios.get(`${API_URL}/id/${id}`);
    }

    obtenerBoletaPDF(codigoCompra) {
        return axios.get(`http://localhost:8080/api/boletas/${codigoCompra}`, { responseType: 'arraybuffer' });
    }


}
export default new VentaService();