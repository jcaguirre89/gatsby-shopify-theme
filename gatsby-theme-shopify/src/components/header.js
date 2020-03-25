import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import Nav from './nav';

const HeaderBase = styled.nav`
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 90px;
`;

const StyledHeader = styled(HeaderBase)`
  background: ${props => (props.transparent ? 'transparent' : 'white')};
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.2);
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: all 200ms ${props => (props.show ? 'ease-in' : 'ease-out')};
  transform: ${props => (props.show ? 'none' : 'translate(0, -100%)')};
`;

export default function Header() {
  const [hideNavbarOnScroll, setHideNavbarOnScroll] = useState(true);
  const [transparent, setTransparent] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      // Note: prevPos.y > -12 is here to fix Nav component disappearing bug
      // due to elastic scrolling/bounce effect in mobile Safari.
      const isShow = currPos.y > prevPos.y || prevPos.y > -12;
      if (isShow !== hideNavbarOnScroll) setHideNavbarOnScroll(isShow);

      const isTransparent = currPos.y >= -500;
      if (isTransparent !== transparent) setTransparent(isTransparent);
    },
    [hideNavbarOnScroll, transparent],
    null,
    false,
    100
  );
  return (
    <StyledHeader show={hideNavbarOnScroll} transparent={transparent}>
      <Nav />
    </StyledHeader>
  );
}
