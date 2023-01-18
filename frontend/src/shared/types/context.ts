import {IUser} from "./user";

export enum IContextActionType {
  SET_USER = 'SET_USER',
}

export interface IContextState {
  user: IUser | null,
}

export interface IContextAction {
  type: IContextActionType,
  payload?: any,
  key?: string
}
