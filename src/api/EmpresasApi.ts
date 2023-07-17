import axios from "axios";

const API = "http://localhost:3001/api/empresas";

export function crearEmpresasRequest(values: any) {
    return axios.post(`${API}`, 
    JSON.stringify(values), 
    { headers: {"Content-Type": "application/json"}});
}

export function getEmpresasRequest() {
    return axios.get(`${API}`);
}

export function deleteEmpresaRequest(id: any) {
    return axios.delete(`${API}/${id}`);
}