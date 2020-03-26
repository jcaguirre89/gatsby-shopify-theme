import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { FaTimes } from 'react-icons/fa';
import MonetaryValue from './MonetaryValue';
import { formatMoney } from './MonetaryValue';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';

import UpdateQuantityButton from './UpdateCartButton';

const CartItemStyle = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: 70px 1fr 40px;
  grid-gap: 5px;
  grid-template-rows: minmax(0, 1fr);
  .title {
    font-family: 'Spartan';
    text-transform: uppercase;
    font-weight: 700;
    margin: 0;
    font-size: 1.2rem;
    padding: 0 5px;
  }
  .middle-col {
    height: 80px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 15px 15px 1fr;
  }
  .last-col {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .price {
    padding: 0 5px;
    margin-bottom: 0;
    margin-right: 0;
    font-size: 1rem;
    font-weight: 700;
  }

  .remove-button {
    align-self: end;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0 5px;
    background: transparent;
    border: 0;
    text-transform: uppercase;
    font-size: 0.9rem;
    color: ${props => props.theme.blue};
    letter-spacing: 1px;
  }
`;

const getQuantityInCart = (id, cartItems) => {
  // gets quantity of given variantId in cart or 0
  const item = cartItems.filter(item => item.variantId === id);
  if (item.length === 0) return 0;
  return item[0].quantity;
};

export default function CartItem({ item }) {
  const dispatch = useContext(GlobalDispatchContext);
  const { cartItems } = useContext(GlobalStateContext);

  const {
    title,
    description,
    variants: [firstVariant],
    images: [firstImage],
  } = item;
  const { id: variantId, price } = firstVariant;

  const quantityInCart = getQuantityInCart(variantId, cartItems);
  console.log(quantityInCart);
  return (
    <CartItemStyle>
      <Img
        fixed={firstImage.localFile.childImageSharp.fixed}
        alt={description}
        key={firstImage.id}
        style={{ height: '100%', width: '100%' }}
      />
      <div className="middle-col">
        <h3 className="title">{title}</h3>
        <p className="price">{formatMoney(price)}</p>
        <button
          className="remove-button"
          type="button"
          onClick={() =>
            dispatch({ type: 'REMOVE_FROM_CART', payload: { variantId } })
          }
        >
          Remove
        </button>
      </div>
      <div className="last-col">
        <div className="update-quantity">
          <UpdateQuantityButton
            variantId={variantId}
            quantity={quantityInCart}
          />
        </div>
      </div>
    </CartItemStyle>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};
