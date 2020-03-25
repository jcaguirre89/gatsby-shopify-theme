import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { FaTimes } from 'react-icons/fa';
import MonetaryValue from './MonetaryValue';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';

import UpdateQuantityButton from './UpdateCartButton';

const CartItemStyle = styled.div`
  max-height: 110px;
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 5px;
  grid-template-rows: minmax(0, 1fr);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .title {
    text-transform: uppercase;
    font-weight: 700;
    margin: 0;
    font-size: 1.1rem;
  }
  .description {
    font-size: 1rem;
    margin: 0;
    color: #b7b7b5;
  }
  .middle-col {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px 1fr 1fr;
  }
  .update-quantity {
    align-self: end;
  }
  .last-col {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
  .price {
    margin-bottom: 0;
    margin-right: 0;
    font-size: 1rem;
    font-weight: 700;
  }
  .remove-button {
    height: 30px;
    width: 30px;
    margin-top: 0;
    margin-right: 0;
    margin-left: auto;
    height: 30px;
    background: white;
    font-size: 1.5rem;
    color: ${props => props.theme.black};
    border: 0px solid transparent;
  }
  .remove-button:hover {
    background: ${props => props.theme.black};
    color: white;
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
      />
      <div className="middle-col">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <div className="update-quantity">
          <UpdateQuantityButton
            variantId={variantId}
            quantity={quantityInCart}
          />
        </div>
      </div>
      <div className="last-col">
        <button
          className="remove-button"
          type="button"
          onClick={() =>
            dispatch({ type: 'REMOVE_FROM_CART', payload: { variantId } })
          }
        >
          <FaTimes />
        </button>
        <p className="price">
          <MonetaryValue amount={price} />
        </p>
      </div>
    </CartItemStyle>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};
