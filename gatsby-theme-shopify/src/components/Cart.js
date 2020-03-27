import React, { useContext } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider';
import CartItem from './CartItem';
import useCheckoutAmout from '../hooks/useCheckoutAmount';
import { ShopifyClientContext } from '../context/ShopifyClientProvider';
import MonetaryValue from './MonetaryValue';

const CartInner = styled.div`
  display: grid;
  place-items: center;
  grid-template-rows: 20px 50px 1fr auto;
  padding: 20px 10px;

  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    max-height: 230px;
    width: 100%;
    padding: 2px;
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

  footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .checkout-button {
    width: 100%;
    background: ${props => props.theme.gold};
    border: 1px solid ${props => props.theme.gold};
    color: ${props => props.theme.white};
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: -0.1px;
    font-weight: 500;
    font-size: 1.5rem;
    cursor: pointer;
  }

  header {
    text-transform: uppercase;
    font-size: 1.6rem;
  }
`;

const CartStyles = styled.div`
  position: fixed;
  top: 90px;
  right: 0;
  bottom: 0;
  z-index: 5;
  min-width: 300px;
  max-width: 400px;
  width: 40%;
  height: 85%;
  transition: all 0.3s;
  background: white;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  ${props => props.open && `transform: translateX(0);`};
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    min-width: auto;
    width: 100%;
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
  const shopifyClient = useContext(ShopifyClientContext);
  const amount = useCheckoutAmout();

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

  const handleCheckout = async () => {
    const checkout = await shopifyClient.checkout.create();
    const { id: checkoutId, webUrl } = checkout;
    if (cartItems.length === 0) return 'No items in cart';
    const lineItems = cartItems.map(item => ({
      variantId: item.variantId.replace('Shopify__ProductVariant__', ''),
      quantity: item.quantity,
    }));
    await shopifyClient.checkout.addLineItems(checkoutId, lineItems);

    window.open(
      webUrl,
      'Popup',
      'toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30'
    );
  };

  return (
    <CartStyles open={isCartOpen}>
      <CartInner>
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
          <p>Total</p>
          <MonetaryValue amount={amount} />
        </footer>
        <button
          className="checkout-button"
          type="button"
          onClick={() => handleCheckout()}
        >
          Checkout
        </button>
      </CartInner>
    </CartStyles>
  );
}
