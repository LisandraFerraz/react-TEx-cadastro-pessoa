// import { del, get, put } from "../Core/core-api";
import { apiInterceptor } from "../Core/api-interceptor";
import { endpoints } from "../Core/endpoints";

export const listarPessoas = async (params?: {}) => {
  return await apiInterceptor.get(endpoints.listarPessoas, { params });
};

export const listarPessoa = async (id: string) => {
  return await apiInterceptor.get(`${endpoints.listarPessoas}${id}`);
};

export const criarPessoa = async (body: {}) => {
  return await apiInterceptor.post(`${endpoints.criarPessoa}`, body);
};

export const atualizarPessoa = async (id: string, body: {}) => {
  return await apiInterceptor.put(`${endpoints.updatePessoa}/${id}`, body);
};

export const deletarPessoa = async (id: string) => {
  return await apiInterceptor.delete(`${endpoints.deletarPessoa}/${id}`);
};

// export const listarPessoas = () => {
//   return get(endpoints.listarPessoas);
// };

// export const listarPessoa = (id: string) => {
//   return get(`${endpoints.listarPessoas}${id}`);
// };

// export const atualizarPessoa = (id: string, body: {}) => {
//   return put(`${endpoints.listarPessoas}${id}`, body);
// };

// export const deletarPessoa = (id: string) => {
//   return del(`${endpoints.deletarPessoa}/${id}`);
// };
