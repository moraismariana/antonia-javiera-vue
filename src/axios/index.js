import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/javiera",
});

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  patch(endpoint, body) {
    return axiosInstance.patch(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
};
