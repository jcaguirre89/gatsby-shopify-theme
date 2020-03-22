import React, { useContext } from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaCartPlus } from 'react-icons/fa';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

const Container = styled.div`
  font-size: 1rem;
  position: relative;

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
`;

export default function ProductCardImage({ img }) {
  const dispatch = useContext(GlobalDispatchContext);
  console.log(img);

  return (
    <Container>
      <Img fixed={img} />
      <CTA onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
        <FaCartPlus size={30} />
      </CTA>
    </Container>
  );
}
