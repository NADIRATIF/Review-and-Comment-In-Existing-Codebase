import React, {createContext, Dispatch, FC, useReducer} from 'react';

import {
  IContextAction,
  IContextActionType,
  IContextState
} from "../shared/types";

export interface IAppStoreContext {
  state: IContextState,
  dispatch: Dispatch<IContextAction>
}

export const initState: IContextState = {
  user: null,
}

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

export const AppStoreContext = createContext<IAppStoreContext>(
  {
    state: initState,
    dispatch: () => {}
  });

export const AppStoreContextProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppStoreContext.Provider value={{state, dispatch}}>
      {children}
    </AppStoreContext.Provider>
  )
};
