import React, { useContext } from 'react';
import styled from 'styled-components';
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider';

const MenuStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 5;
  min-width: 400px;
  width: 40%;
  height: 100%;
  background: ${props => props.theme.white};
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  ${props => props.open && `transform: translateX(0);`};
  display: grid;
  grid-template-rows: auto 1fr auto;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    min-width: auto;
    width: 100%;
  }
`;

export default function Menu() {
  const { isMenuOpen } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  console.log(isMenuOpen);
  return (
    <MenuStyles open={isMenuOpen}>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_MENU' })}>
        Close
      </button>
      <div>Content</div>
    </MenuStyles>
  );
}
