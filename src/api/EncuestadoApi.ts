import axios from "axios";

const API = "http://localhost:3001/api/encuestado";

export function crearEncuestadoRequest(values: any) {
  return axios.post(`${API}`, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
}

export function getImagenesRequest(id: any) {
  return axios.get(`${API}/upload/${id}`, {responseType: 'blob'});
}

export function getEncuestasRequest() {
  return axios.get(`${API}`);
}

export function getSingleEncuestaRequest(id: any) {
  return axios.get(`${API}/${id}`);
}

export function buscarEncuestadosPorNombreRequest(nombre: string) {
  return axios.post(`${API}/buscar-por-nombre`, { nombre }, {
    headers: { "Content-Type": "application/json" },
  });
}