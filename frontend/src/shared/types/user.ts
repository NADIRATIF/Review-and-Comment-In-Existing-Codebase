export type ISignInUser = {
  email: string,
  password: string,
}

export type ICreateUser = {
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
}

export type IUser = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  createdAt: string,
  updatedAt: string,
}
