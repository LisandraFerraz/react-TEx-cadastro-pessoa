import axios from "axios";

const ApiInterceptor = () => {
  const api = axios.create({
    // backend rodando localmente
    baseURL: "http://localhost:3000",
  });

  api.interceptors.request.use(
    (config) => {
      if (!config.url && config.url?.startsWith("http")) {
        config.url = `http://localhost:3000${config.url}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return api;
};

export const apiInterceptor = ApiInterceptor();
