import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { MdMenu } from 'react-icons/md';
import { AiOutlineShopping } from 'react-icons/ai';
import Logo from './Logo';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';
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

export default function Header({ smart }) {
  const dispatch = useContext(GlobalDispatchContext);
  const [hideNavbarOnScroll, transparent] = useSmartHeader();
  const isTransparent = smart ? transparent : false;

  return (
    <StyledHeader show={hideNavbarOnScroll} transparent={isTransparent}>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_MENU' })}>
        <StyledMenuIcon size={35} />
      </button>
      <Link to="/">
        <Logo
          width="50px"
          height="50px"
          color={isTransparent ? 'white' : 'black'}
        />
      </Link>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
        <AiOutlineShopping size={35} />
      </button>
    </StyledHeader>
  );
}

Header.propTypes = {
  fixed: PropTypes.bool,
};

Header.defaultProps = {
  smart: true,
};
