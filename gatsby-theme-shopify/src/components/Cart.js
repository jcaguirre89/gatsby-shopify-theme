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
  display: grid;
  place-items: center;
  grid-template-rows: 20px 50px 1fr auto;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
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
  console.log(cartItems);

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
        <button type="button" onClick={() => handleCheckout()}>
          Checkout
        </button>
        <p>{amount}</p>
      </footer>
    </CartStyles>
  );
}
