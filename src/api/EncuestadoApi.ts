import axios from "axios";

const API = "http://localhost:3001/api/encuestado";

export function crearEncuestadoRequest(values: any) {
  return axios.post(`${API}`, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
}

export function getEncuestasRequest() {
  return axios.get(`${API}`);
}

export function getSingleEncuestaRequest(id: any) {
  return axios.get(`${API}/${id}`);
}
