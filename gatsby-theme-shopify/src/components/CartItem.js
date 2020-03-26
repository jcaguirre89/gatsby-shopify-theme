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
  max-height: 110px;
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
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 15px 15px 1fr;
  }
  .last-col {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
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
  }
`;

export default function CartItem({ item }) {
  const dispatch = useContext(GlobalDispatchContext);
  const { cartItems } = useContext(GlobalStateContext);

  const {
    title,
    description,
    quantityInCart,
    variants: [firstVariant],
    images: [firstImage],
  } = item;
  const { id: variantId, price } = firstVariant;
  return (
    <CartItemStyle>
      <Img
        fixed={firstImage.localFile.childImageSharp.fixed}
        alt={description}
        key={firstImage.id}
        style={{ height: '100%' }}
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
