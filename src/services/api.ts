import axios from 'axios';
import type { User } from './../types/User';

const API_URL = 'http://localhost:5000/api/users'; // adjust if needed

export const getUsers = () => axios.get<User[]>(API_URL);
export const createUser = (user: { name: string; email: string }) =>axios.post<User>(API_URL, user);
export const updateUser = (id: string, user: { name: string; email: string }) =>axios.put<User>(`${API_URL}/${id}`, user);
export const deleteUser = (id: string) => axios.delete(`${API_URL}/${id}`);
