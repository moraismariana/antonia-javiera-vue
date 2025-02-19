import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/javiera",
});

const axiosTokenInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (erro) {
    return Promise.reject(erro);
  }
);

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

export const apiToken = {
  post(endpoint, body) {
    return axiosTokenInstance.post(endpoint, body);
  },
};
