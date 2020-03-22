import React, { useReducer, createContext } from 'react';

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

const initialState = {
  isCartOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    default:
      throw new Error('Bad action type');
  }
}

export default function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}
