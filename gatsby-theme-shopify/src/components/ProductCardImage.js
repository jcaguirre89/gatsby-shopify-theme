import React, { useContext } from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AiOutlineShopping } from 'react-icons/ai';
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider';

const Container = styled.div`
  font-size: 1rem;
  position: relative;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
`;

const CTA = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: white;
  border: 1px solid white;
  color: ${props => props.theme.offBlack};
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: ${props => props.theme.bs};
  }
`;

export default function ProductCardImage({
  storePath,
  handle,
  variantId,
  image,
}) {
  const dispatch = useContext(GlobalDispatchContext);
  const { isCartOpen } = useContext(GlobalStateContext);

  const handleClick = () => {
    dispatch({ type: 'UPDATE_CART', payload: { variantId, quantity: 1 } });
    if (!isCartOpen) {
      dispatch({ type: 'TOGGLE_CART' });
    }
  };

  return (
    <Container>
      <Link to={`${storePath}/${handle}`}>
        <Img fluid={image} />
      </Link>
      <CTA onClick={() => handleClick()}>
        <AiOutlineShopping size={30} />
      </CTA>
    </Container>
  );
}
