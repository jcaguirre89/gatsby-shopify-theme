import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import Spinner from 'react-svg-spinner';
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider';
import CartItem from './CartItem';
import useCheckoutAmout from '../hooks/useCheckoutAmount';
import { ShopifyClientContext } from '../context/ShopifyClientProvider';
import MonetaryValue from './MonetaryValue';
import BaseButton from './styles/BaseButton';
import theme from './styles/theme';

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
    cursor: pointer;
  }

  footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
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
  background: ${props => props.theme.colors.background};
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  ${props => props.open && `transform: translateX(0);`};
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    min-width: auto;
    width: 100%;
  }
`;

export default function Cart() {
  const { isCartOpen, cartItems } = useContext(GlobalStateContext);
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);
  const dispatch = useContext(GlobalDispatchContext);
  const shopifyClient = useContext(ShopifyClientContext);
  const amount = useCheckoutAmout();

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    const checkout = await shopifyClient.checkout.create();
    const { id: checkoutId, webUrl } = checkout;
    if (cartItems.length === 0) return 'No items in cart';
    const lineItems = cartItems.map(item => ({
      variantId: item.variantId.replace('Shopify__ProductVariant__', ''),
      quantity: item.quantity,
    }));
    await shopifyClient.checkout.addLineItems(checkoutId, lineItems);
    window.location.href = webUrl;
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
          {cartItems.length > 0 &&
            cartItems.map(item => (
              <CartItem key={item.variantId} variantId={item.variantId} />
            ))}
        </ul>
        <footer>
          <p>Total</p>
          <MonetaryValue amount={amount} />
        </footer>
        {isCheckoutLoading ? (
          <Spinner size="32px" color={theme.colors.primary} />
        ) : (
          <BaseButton
            disabled={isCheckoutLoading}
            onClick={() => handleCheckout()}
          >
            Checkout
          </BaseButton>
        )}
      </CartInner>
    </CartStyles>
  );
}
