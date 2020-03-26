import React, { useContext } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { FaLongArrowAltLeft } from 'react-icons/fa';
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
  height: 85%;
  transition: all 0.3s;
  background: white;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  ${props => props.open && `transform: translateX(0);`};
  display: grid;
  place-items: center;
  grid-template-rows: 20px 50px 1fr auto;
  @media (max-width: 400px) {
    min-width: auto;
    width: 100%;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    padding: 10px;
    list-style: none;
    overflow-y: scroll;
  }

  .close-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: none;
    border: none;
  }

  header {
    text-transform: uppercase;
    font-size: 1.6rem;
  }
`;

const filterCart = (products, cartItems) => {
  // takes query of all shopify products and returns only ones in cart
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
                fixed(width: 80, height: 80) {
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
      <button
        className="close-button"
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      >
        <FaLongArrowAltLeft size={30} />
      </button>
      <header>
        <h3>YOUR BAG</h3>
      </header>
      <ul>
        {productsInCart &&
          productsInCart.map(item => (
            <CartItem key={item.handle} item={item} />
          ))}
      </ul>
      <footer>
        <h4>Checkout</h4>
      </footer>
    </CartStyles>
  );
}
