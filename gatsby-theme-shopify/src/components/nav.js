import React from 'react';
import { Link } from 'gatsby';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link to="/about">about</Link>
    </NavStyles>
  );
}
