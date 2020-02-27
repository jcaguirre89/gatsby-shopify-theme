import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Logo from '../assets/mount-leaf.svg';
import Nav from './nav';

const StyledLogo = styled.div`
  margin-left: 2rem;
  a {
    padding: 0.5rem 1rem;
    text-decoration: none;
    text-transform: uppercase;
    color: ${props => props.theme.black};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledLogo>
        <Link to="/">
          <img
            style={{ height: `5rem`, width: `5rem`, marginRight: `1rem` }}
            src={Logo}
            alt="logo"
          />
          home
        </Link>
      </StyledLogo>
      <Nav />
    </StyledHeader>
  );
}
