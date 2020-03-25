import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Currency = styled.span`
  color: ${props => props.theme.grey};
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-right: 10px;
`;

const Amount = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
`;

export const formatMoney = value => {
  const options = {
    // style: 'currency',
    // currency: currencyCode,
    minimumFractionDigits: 0,
  };
  // if its a whole, dollar amount, leave off the .00
  // if (value % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('es', options);
  const formatted = formatter.format(value);
  return `$${formatted}`;
};

export default function MonetaryValue({ amount, currencyCode }) {
  return (
    <Container>
      <Currency>{currencyCode}</Currency>
      <Amount>{formatMoney(amount)}</Amount>
    </Container>
  );
}

MonetaryValue.propTypes = {
  amount: PropTypes.string.isRequired,
  currencyCode: PropTypes.string,
};

MonetaryValue.defaultProps = {
  currencyCode: 'CLP',
};
