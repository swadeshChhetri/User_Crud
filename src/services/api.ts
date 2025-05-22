import axios from 'axios';
import type { User } from './../types/User';

const API_URL = 'http://localhost:5000/api/users'; // adjust if needed

export const getUsers = () => axios.get<User[]>(API_URL);
export const createUser = (user: Omit<User, 'id'>) => axios.post<User>(API_URL, user);
export const updateUser = (id: number, user: Omit<User, 'id'>) => axios.put(`${API_URL}/${id}`, user);
export const deleteUser = (id: number) => axios.delete(`${API_URL}/${id}`);
