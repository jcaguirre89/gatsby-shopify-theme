import React, { useReducer, createContext } from 'react';

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

const initialState = {
  isCartOpen: false,
  isMenuOpen: false,
  isSearchOpen: false,
  cartItems: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case 'TOGGLE_MENU':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    case 'TOGGLE_SEARCH':
      return {
        ...state,
        isSearchOpen: !state.isSearchOpen,
      };
    case 'UPDATE_CART': {
      const { variantId } = action.payload;
      // remove from cart
      const updatedCartItems = state.cartItems.filter(
        i => i.variantId !== variantId
      );
      return {
        ...state,
        cartItems: [...updatedCartItems, action.payload],
      };
    }
    case 'REMOVE_FROM_CART': {
      const { variantId } = action.payload;
      const updatedCartItems = state.cartItems.filter(
        i => i.variantId !== variantId
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }
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
