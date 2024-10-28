import axios from 'axios';

const API_URL = 'http://localhost:8080/api/compras';

const guardarCompra = (compra, boletaPDF) => {
    const formData = new FormData();
    formData.append('compra', JSON.stringify(compra));
    formData.append('boletaPDF', new Blob([boletaPDF], { type: 'application/pdf' }));

    return axios.post(`${API_URL}/guardar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export default {
    guardarCompra,
};