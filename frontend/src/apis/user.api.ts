import Http from "./api";
import { ICreateUser, ISignInUser } from "../shared/types";

export const getAll = () => {
  return Http.get("/users/get-all");
}

export const createUser = (userData: ICreateUser) => {
  return Http.post("/users/create", {data: userData});
};

export const getUser = (id: string) => {
  return Http.get(`/users/get/${id}`);
};

export const updateUser = (id: string, data: ICreateUser) => {
  return Http.put(`/users/update/${id}`, {data});
};

export const deleteUser = (id: string) => {
  return Http.delete(`/users/delete/${id}`);
};

export const signIn = (userData: ISignInUser) => {
  return Http.post("/users/sign-in", {data: userData});
};

export const me = () => {
  return Http.get('/users/me');
};
