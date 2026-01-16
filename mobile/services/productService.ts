import { api } from './api';

export const getProducts = (id_user: number) => api.get(`/products/user/${id_user}`);

export const createProduct = (data: any) =>
  api.post('/products', data);

export const updateProduct = (id: number, data: any) =>
  api.put(`/products/${id}`, data);

export const deleteProduct = (id: number) =>
  api.delete(`/products/${id}`);
