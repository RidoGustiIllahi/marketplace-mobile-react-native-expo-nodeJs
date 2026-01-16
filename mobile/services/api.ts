import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.22.209.58:3001/api',
});
