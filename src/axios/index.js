import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/javiera",
});

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
};
