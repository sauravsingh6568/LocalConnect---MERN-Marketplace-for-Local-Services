import axios from "axios";

const API = axios.create({
  baseURL:import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  timeout:15000
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const isRequestCanceled = (err) => err.code === "ERR_CANCELED";

export const getApiErrorMessage = (err, fallback = "Something went wrong") => {
  const responseMessage = err.response?.data?.message;
  const validationErrors = err.response?.data?.errors;

  if (Array.isArray(validationErrors) && validationErrors.length > 0) {
    return validationErrors.join(", ");
  }

  return responseMessage || err.message || fallback;
};

export default API;
