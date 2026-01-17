import { api } from './api';

export const getProductsByUser = (id_user: number) => {
  return api.get(`/products/user/${id_user}`);
};

export const createProduct = (data: FormData) => {
  return api.post('/products', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateProduct = (id: number, data: FormData) => {
  return api.put(`/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteProductById = (id: number) => {
  return api.delete(`/products/${id}`);
};
