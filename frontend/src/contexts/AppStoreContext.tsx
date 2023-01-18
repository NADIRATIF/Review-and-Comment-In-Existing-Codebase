import React, {createContext, Dispatch, FC, useReducer} from 'react';

import {
  IContextAction,
  IContextActionType,
  IContextState
} from "../shared/types";

/**
 * IAAppStoreContext is the interface for the AppStoreContext
 * @interface IAppStoreContext
 */
export interface IAppStoreContext {
  state: IContextState,
  dispatch: Dispatch<IContextAction>
}

/**
 * initialState is the initial state for the context
 */
export const initState: IContextState = {
  user: null,
}

/**
 * reducer is the reducer for the context
 * @param state
 * @param action
 */
export const reducer = (state: IContextState, action: IContextAction): IContextState => {
  switch (action.type) {
    case IContextActionType.SET_USER:
      console.log('user--->', action.payload);
      return {
        ...state,
        user: action.payload
      };
  }
}

/**
 * AppStoreContext is the context for the app
 */
export const AppStoreContext = createContext<IAppStoreContext>(
  {
    state: initState,
    dispatch: () => {}
  });

/**
 * AppStoreProvider is the provider for the context
 * @param children
 * @constructor
 */
export const AppStoreContextProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppStoreContext.Provider value={{state, dispatch}}>
      {children}
    </AppStoreContext.Provider>
  )
};
