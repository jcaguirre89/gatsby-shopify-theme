import React, { useContext } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider';
import CartItem from './CartItem';

const CartStyles = styled.div`
  position: fixed;
  top: 90px;
  right: 0;
  bottom: 0;
  z-index: 5;
  min-width: 400px;
  width: 40%;
  height: 100%;
  transition: all 0.3s;
  background: white;
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

const filterCart = (products, cartItems) => {
  const idsInCart = cartItems.map(item => item.variantId);
  const filteredProducts = products.filter(item =>
    idsInCart.includes(item.variants[0].id)
  );
  return filteredProducts;
};

export default function Cart() {
  const { isCartOpen, cartItems } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  const data = useStaticQuery(graphql`
    query MyQuery {
      allShopifyProduct {
        nodes {
          description
          handle
          images {
            id
            localFile {
              childImageSharp {
                fixed(width: 120, height: 120) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          }
          title
          variants {
            id
            price
          }
        }
      }
    }
  `);
  const products = data.allShopifyProduct.nodes;
  const productsInCart = filterCart(products, cartItems);
  return (
    <CartStyles open={isCartOpen}>
      <button type="button" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
        &times;
      </button>
      {productsInCart &&
        productsInCart.map(item => <CartItem key={item.handle} item={item} />)}
    </CartStyles>
  );
}
