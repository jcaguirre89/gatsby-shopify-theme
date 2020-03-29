import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  p {
    margin: 0 4px;
  }
`;

const Currency = styled.p`
  color: ${props => props.theme.colors.grey};
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const Amount = styled.p`
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
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currencyCode: PropTypes.string,
};

MonetaryValue.defaultProps = {
  currencyCode: 'CLP',
};
