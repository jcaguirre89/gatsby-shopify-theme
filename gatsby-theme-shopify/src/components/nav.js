import React, { useContext } from 'react';
import { Link } from 'gatsby';
import NavStyles from './styles/NavStyles';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

export default function Nav() {
  const dispatch = useContext(GlobalDispatchContext);
  return (
    <NavStyles>
      <Link to="/about">about</Link>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
        cart
      </button>
    </NavStyles>
  );
}
