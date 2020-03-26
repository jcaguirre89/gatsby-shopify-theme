import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaLongArrowAltRight } from 'react-icons/fa';
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider';

const MenuStyles = styled.div`
  position: fixed;
  top: 90px;
  left: 0;
  bottom: 0;
  z-index: 5;
  min-width: 350px;
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

  .close-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: none;
    border: none;
  }
`;

export default function Menu() {
  const { isMenuOpen } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  return (
    <MenuStyles open={isMenuOpen}>
      <button
        className="close-button"
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
      >
        <FaLongArrowAltRight size={30} />
      </button>
      <div>Content</div>
    </MenuStyles>
  );
}
