import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

const StyledButton = styled.button`
  display: grid;
  place-items: center;
  height: 20px;
  width: 20px;
  background: transparent;
  color: ${props => props.theme.offBlack};
  border: 0px solid;
  margin: 0;
  cursor: pointer;
`;

const Container = styled.div`
  width: 20px;
  height: 60px;
  margin-right: 5px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const QuantityContainer = styled.span`
  flex-grow: 2;
  display: grid;
  place-items: center center;
  font-size: 0.9rem;
  font-weight: 700;
  height: 20px;
  border: 0px solid;
`;

export default function UpdateQuantityButton({ variantId, quantity }) {
  const dispatch = useContext(GlobalDispatchContext);
  const handleClick = (id, q) => {
    dispatch({ type: 'UPDATE_CART', payload: { variantId: id, quantity: q } });
  };

  return (
    <Container>
      <StyledButton
        variantId={variantId}
        onClick={() => handleClick(variantId, quantity + 1)}
      >
        <IoIosArrowUp size={16} />
      </StyledButton>
      <QuantityContainer>{quantity}x</QuantityContainer>
      <StyledButton
        disabled={quantity <= 1}
        onClick={() => handleClick(variantId, quantity - 1)}
      >
        <IoIosArrowDown size={16} />
      </StyledButton>
    </Container>
  );
}

UpdateQuantityButton.propTypes = {
  variantId: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};
