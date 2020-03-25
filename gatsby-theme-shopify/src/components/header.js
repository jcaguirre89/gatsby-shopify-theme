import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { MdMenu } from 'react-icons/md';
import { AiOutlineShopping } from 'react-icons/ai';
import Logo from './Logo';
// import NavStyles from './styles/NavStyles';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

const HeaderBase = styled.nav`
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  width: 100%;
  height: 90px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  border-bottom: 1px solid ${props => props.theme.gold};
  a,
  button {
    margin: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    border: 0;
    background: none;
    cursor: pointer;
    color: ${props => (props.transparent ? 'white' : 'black')};
  }
`;

const StyledHeader = styled(HeaderBase)`
  background: ${props => (props.transparent ? 'transparent' : 'white')};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: all 200ms ${props => (props.show ? 'ease-in' : 'ease-out')};
  transform: ${props => (props.show ? 'none' : 'translate(0, -100%)')};
`;

const StyledMenuIcon = styled(MdMenu)`
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${props => props.theme.gold};
    transform: rotate(-90deg);
  }
`;

export default function Header() {
  const [hideNavbarOnScroll, setHideNavbarOnScroll] = useState(true);
  const [transparent, setTransparent] = useState(true);
  const dispatch = useContext(GlobalDispatchContext);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y || prevPos.y > -100;
      if (isShow !== hideNavbarOnScroll) setHideNavbarOnScroll(isShow);

      const isTransparent = currPos.y >= -100;
      if (isTransparent !== transparent) setTransparent(isTransparent);
    },
    [hideNavbarOnScroll, transparent],
    null,
    false,
    100
  );
  return (
    <StyledHeader show={hideNavbarOnScroll} transparent={transparent}>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_MENU' })}>
        <StyledMenuIcon size={35} />
      </button>
      <Link to="/">
        <Logo
          width="50px"
          height="50px"
          color={transparent ? 'white' : 'black'}
        />
      </Link>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
        <AiOutlineShopping size={35} />
      </button>
    </StyledHeader>
  );
}
