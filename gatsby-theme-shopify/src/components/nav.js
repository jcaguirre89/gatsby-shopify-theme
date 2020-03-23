import React, { useContext } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components'
// import NavStyles from './styles/NavStyles';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  background: transparent;
  a,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    color: ${props => props.theme.black};
  }
`;

export default function Nav() {
  const dispatch = useContext(GlobalDispatchContext);
  return (
    <NavStyles>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_MENU' })}>
        menu
      </button>
      <Link to="/about">about</Link>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
        cart
      </button>
    </NavStyles>
  );
}
