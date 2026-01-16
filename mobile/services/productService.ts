import { api } from './api';

export const getProducts = (id_user: number) => api.get(`/products/user/${id_user}`, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const createProduct = (data: any) =>
  api.post('/products', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateProduct = (id: number, data: any) =>
  api.put(`/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteProduct = (id: number) =>
  api.delete(`/products/${id}`);
