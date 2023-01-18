/**
 * ISignUpUser is the type for the user object that is sent to the server
 */
export type ISignInUser = {
  email: string,
  password: string,
}

/**
 * ICreateUser is the type for the user object that is sent to the server
 */
export type ICreateUser = {
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
}

/**
 * IUser is the type for the user object that is returned from the server
 */
export type IUser = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  createdAt: string,
  updatedAt: string,
}
