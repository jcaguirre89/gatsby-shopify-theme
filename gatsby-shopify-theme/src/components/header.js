import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { MdMenu } from 'react-icons/md';
import { AiOutlineShopping } from 'react-icons/ai';
import Logo from './Logo';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';
import useSmartHeader from '../hooks/useSmartHeader';

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
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
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

const MenuIconContainer = styled.div`
  height: 100%;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 0;
  padding: 10px;
`;

const StyledMenuIcon = styled(MdMenu)`
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: rotate(-90deg);
  }
`;

const BadgeContainer = styled.div`
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center center;
  border-radius: 20px;
  position: absolute;
  top: 0px;
  left: 30px;
  color: white;
  background: ${props => props.theme.colors.accent};
  font-size: 0.8em;
`;

export default function Header({ smart }) {
  const dispatch = useContext(GlobalDispatchContext);
  const { cartItems } = useContext(GlobalStateContext);
  const [hideNavbarOnScroll, transparent] = useSmartHeader();
  const isTransparent = smart ? transparent : false;

  const getCartSize = () => {
    if (cartItems.length === 0) return 0;
    const n = cartItems.reduce((agg, item) => agg + item.quantity, 0);
    return n;
  };

  const n = getCartSize();

  return (
    <StyledHeader show={hideNavbarOnScroll} transparent={isTransparent}>
      <MenuIconContainer>
        <StyledMenuIcon
          onMouseEnter={() => dispatch({ type: 'TOGGLE_MENU' })}
          size={35}
        />
      </MenuIconContainer>
      <Link to="/">
        <Logo
          width="50px"
          height="50px"
          color={isTransparent ? 'white' : 'black'}
        />
      </Link>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
        {n > 0 && <BadgeContainer>{n}</BadgeContainer>}
        <AiOutlineShopping size={35} />
      </button>
    </StyledHeader>
  );
}

Header.propTypes = {
  smart: PropTypes.bool,
};

Header.defaultProps = {
  smart: true,
};
