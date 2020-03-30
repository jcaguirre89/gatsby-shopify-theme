import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const ProductGrid = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;
  min-height: 500px;

  @media (min-width: ${props => props.theme.breakpoints.m}) {
    margin: 20px;
  }
`;

export default function ProductList({ products }) {
  return (
    <ProductGrid>
      {products
        .filter(p => p.availableForSale)
        .map(product => (
          <ProductCard key={product.handle} product={product} />
        ))}
    </ProductGrid>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};