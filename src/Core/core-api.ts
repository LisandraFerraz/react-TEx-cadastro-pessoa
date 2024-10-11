import { apiInterceptor } from "./api-interceptor";

export const get = async (endpoint: string) => {
  try {
    const res = await apiInterceptor.get(endpoint);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const post = async (endpoint: string, body: {}) => {
  try {
    const res = await apiInterceptor.post(endpoint, body);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const put = async (endpoint: string, body: {}) => {
  try {
    const res = await apiInterceptor.put(endpoint, body);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const del = async (endpoint: string) => {
  try {
    const res = await apiInterceptor.delete(endpoint);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
