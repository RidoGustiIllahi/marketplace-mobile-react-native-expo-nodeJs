import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'penjual' | 'pembeli';
  address: string;
}

export const loginService = async ({ email, password }: LoginPayload) => {
  try {
    const res = await api.post('/users/login', { email, password });

    const { role, id_user } = res.data.user;
    
    await AsyncStorage.setItem('id_user', id_user.toString());
    await AsyncStorage.setItem('role', role);

    return {
      success: true,
      role,
      user: res.data.user,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Terjadi kesalahan sistem'
    );
  }
};

export const registerService = async (payload: RegisterPayload) => {
  try {
    await api.post('/users/register', payload);
    return true;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Terjadi kesalahan'
    );
  }
};
