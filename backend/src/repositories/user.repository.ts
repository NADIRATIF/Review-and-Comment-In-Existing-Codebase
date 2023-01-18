import { User } from '../models/User';

export const getAllUsers = async (filters?: any) => {
  return User.find(filters);
};

export const getUserById = async (id: string) => {
  return User.findById(id);
};

export const createUser = async (data) => {
  return User.create(data);
};

export const deleteUser = async (id: string) => {
  return User.findByIdAndDelete(id);
};

export const updateUser = async (id: string, data) => {
  return User.findByIdAndUpdate(id, data);
};