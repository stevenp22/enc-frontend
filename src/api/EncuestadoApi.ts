import axios from "axios";

const API = "http://localhost:3000/api/encuestado";

export function crearEncuestadoRequest(values: any) {
    return axios.post(`${API}`, 
    JSON.stringify(values), 
    { headers: {"Content-Type": "application/json"}});
}