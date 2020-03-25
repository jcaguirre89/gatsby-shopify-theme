import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

const StyledButton = styled.button`
  display: grid;
  place-items: center;
  height: 20px;
  width: 20px;
  background: white;
  color: ${props => props.theme.lightGrey};
  border: 0.5px solid ${props => props.theme.lightGrey};
  margin: 0;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.black};
    color: white;
  }
`;

const Container = styled.div`
  width: 80px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  place-items: center center;
`;

const QuantityContainer = styled.span`
  flex-grow: 2;
  display: grid;
  place-items: center center;
  font-size: 0.9rem;
  font-weight: 700;
  height: 20px;
  border: 0.5px solid ${props => props.theme.lightGrey};
`;

export default function UpdateQuantityButton({ variantId, quantity }) {
  const dispatch = useContext(GlobalDispatchContext);
  const handleClick = (id, q) => {
    dispatch({ type: 'UPDATE_CART', payload: { variantId: id, quantity: q } });
  };

  return (
    <Container>
      <StyledButton
        disabled={quantity <= 1}
        onClick={() => handleClick(variantId, quantity - 1)}
      >
        <FaMinus size={8} />
      </StyledButton>
      <QuantityContainer>{quantity}x</QuantityContainer>
      <StyledButton
        variantId={variantId}
        onClick={() => handleClick(variantId, quantity + 1)}
      >
        <FaPlus size={8} />
      </StyledButton>
    </Container>
  );
}

UpdateQuantityButton.propTypes = {
  variantId: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};
