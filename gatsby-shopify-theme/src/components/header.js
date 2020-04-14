import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { MdSearch, MdMenu } from 'react-icons/md';
import { AiOutlineShopping } from 'react-icons/ai';
import Logo from './Logo';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';
import useSmartHeader from '../hooks/useSmartHeader';
import SocialLinks from './SocialLinks';

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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 0;
    background: none;
    cursor: pointer;
    height: 100%;
    width: 80px;
    color: ${props => (props.transparent ? '#fff' : '#000')};
    margin: 0;
    padding: 10px;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const StyledHeader = styled(HeaderBase)`
  background: ${props => (props.transparent ? 'transparent' : 'white')};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: all 200ms ${props => (props.show ? 'ease-in' : 'ease-out')};
  transform: ${props => (props.show ? 'none' : 'translate(0, -100%)')};

  ul {
    display: flex;
  }
`;

const SearchButton = styled.button`
  margin: 0;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  align-self: flex-end;
`;

const BadgeContainer = styled.div`
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center center;
  border-radius: 20px;
  position: absolute;
  top: 10px;
  left: 40px;
  color: white;
  background: ${props => props.theme.colors.accent};
  font-size: 0.8em;
`;

const SocialLinksContainer = styled.div`
  width: 150px;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    display: none;
  }
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
      <button
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
        className="menu"
      >
        <MdMenu size={35} />
      </button>
      <Link to="/">
        <Logo
          width="50px"
          height="50px"
          color={isTransparent ? 'white' : 'black'}
        />
      </Link>
      <ul>
        <SocialLinksContainer>
          <SocialLinks />
        </SocialLinksContainer>
        <SearchButton
          type="button"
          onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })}
        >
          <MdSearch size={35} />
        </SearchButton>
        <button type="button" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
          {n > 0 && <BadgeContainer>{n}</BadgeContainer>}
          <AiOutlineShopping size={35} />
        </button>
      </ul>
    </StyledHeader>
  );
}

Header.propTypes = {
  smart: PropTypes.bool,
};

Header.defaultProps = {
  smart: true,
};
