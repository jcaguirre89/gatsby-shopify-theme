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
import CTA from './styles/AddToCartCTA';

const Container = styled.div`
  font-size: 1rem;
  position: relative;
  width: 100%;
  height: 100%;
`;

export default function ProductCardImage({
  storePath,
  handle,
  variantId,
  fluid,
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
        <Img fluid={fluid} style={{ height: '100%' }} />
      </Link>
      <CTA onClick={() => handleClick()}>
        <AiOutlineShopping size={30} />
      </CTA>
    </Container>
  );
}

ProductCardImage.propTypes = {
  fluid: PropTypes.object.isRequired,
  handle: PropTypes.string.isRequired,
  storePath: PropTypes.string.isRequired,
  variantId: PropTypes.string.isRequired,
};

ProductCardImage.defaultProps = {
  storePath: '/store',
};
