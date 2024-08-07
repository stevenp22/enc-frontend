import axios from "axios";

const API = "http://localhost:3001/api/login";

export function loginRequest(values: any) {
  return axios.post(`${API}`, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
}
