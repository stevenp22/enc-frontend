import axios from "axios";

const API = "http://localhost:3001/api/opciones";

export function getOpcionesRequest() {
  return axios.get(`${API}`);
}

export function crearOpcionesRequest(values: any) {
  return axios.post(`${API}`, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
}

export function getSingleOpcionesRequest(id: any) {
  return axios.get(`${API}/${id}`);
}