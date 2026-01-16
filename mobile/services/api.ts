import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.0.2.2:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
