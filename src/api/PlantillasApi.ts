import axios from "axios";

const API = "http://localhost:3001/api/plantillas";

export function getPlantillasRequest() {
  return axios.get(`${API}`);
}

export function crearPlantillaRequest(values: any) {
  return axios.post(`${API}`, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
}

export function enviarImagenRequest(imagen: any) {
  const formData = new FormData();
  formData.append('imagen', imagen);
  return axios.post(`${API}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function getSinglePlantillaRequest(id: any) {
  return axios.get(`${API}/${id}`);
}

export function deletePlantillaRequest(id: any) {
  return axios.delete(`${API}/${id}`);
}
