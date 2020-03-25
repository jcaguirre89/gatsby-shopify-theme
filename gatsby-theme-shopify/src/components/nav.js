import React, { useContext } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { MdMenu } from 'react-icons/md';
import { AiOutlineShopping } from 'react-icons/ai';
import Logo from './Logo';
// import NavStyles from './styles/NavStyles';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    color: ${props => props.theme.white};
  }
`;

export default function Nav() {
  const dispatch = useContext(GlobalDispatchContext);
  return (
    <NavStyles>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_MENU' })}>
        <MdMenu />
      </button>
      <Link to="/">
        <Logo width="50px" height="50px" />
      </Link>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
        <AiOutlineShopping />
      </button>
    </NavStyles>
  );
}
