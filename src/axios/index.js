import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/javiera",
});

const axiosTokenInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.accessToken;
    if (accessToken) {
      const decodedAccessToken = decodeJWT(accessToken);
      if (decodedAccessToken && decodedAccessToken.exp) {
        const isExpired = decodedAccessToken.exp * 1000 < Date.now();
        if (isExpired) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userGroups");
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userGroups");
      }
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
