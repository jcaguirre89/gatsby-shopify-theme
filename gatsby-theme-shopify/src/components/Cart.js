import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalStateContext } from '../context/GlobalContextProvider';

const CartStyles = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  min-width: 400px;
  width: 40%;
  height: 100%;
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  ${props => props.open && `transform: translateX(0);`};
  display: grid;
  grid-template-rows: auto 1fr auto;
  @media (max-width: 400px) {
    min-width: auto;
    width: 100%;
  }
`;

export default function Cart() {
  const { isCartOpen, cartItems } = useContext(GlobalStateContext);
  return (
    <CartStyles open={isCartOpen}>
      <div>Content</div>
    </CartStyles>
  );
}
