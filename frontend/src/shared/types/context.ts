import {IUser} from "./user";

/**
 * IContextActionType is the type for the action type that is sent to the server
 */
export enum IContextActionType {
  SET_USER = 'SET_USER',
}

/**
 * IContextState is the interface for the context state
 */
export interface IContextState {
  user: IUser | null,
}

/**
 * IContextAction is the interface for the context action
 */
export interface IContextAction {
  type: IContextActionType,
  payload?: any,
  key?: string
}
