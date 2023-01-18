import Http from "./api";
import { ICreateUser, ISignInUser } from "../shared/types";

/**
 * @returns {Promise} Promise object represents an array of users
 */
export const getAll = () => {
  return Http.get("/users/get-all");
}

/**
 * Create a new user
 * @param ICreateUser
 * @param userData
 */
export const createUser = (userData: ICreateUser) => {
  return Http.post("/users/create", {data: userData});
};

/**
 * Get a user by id
 * unused in this project
 */
export const getUser = (id: string) => {
  return Http.get(`/users/get/${id}`);
};

/**
 * Update a user by id
 * @param id
 * @param data
 */
export const updateUser = (id: string, data: ICreateUser) => {
  return Http.put(`/users/update/${id}`, {data});
};

/**
 * Delete a user by id
 * @param id
 */
export const deleteUser = (id: string) => {
  return Http.delete(`/users/delete/${id}`);
};

/**
 * Sign in a user
 * @param userData
 */
export const signIn = (userData: ISignInUser) => {
  return Http.post("/users/sign-in", {data: userData});
};

/**
 * Current user
 * unused in this project
 */
export const me = () => {
  return Http.get('/users/me');
};
