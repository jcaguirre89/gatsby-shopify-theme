import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import ProductCardImage from './ProductCardImage';

const ProductCardStyle = styled.div`
  background: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  display: flex;
  flex-direction: column;
  margin: 0;
  p {
    line-height: 2;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
`;

export default function ProductCard({ product }) {
  const { title, description, handle, variants, images } = product;
  const { id: variantId, price } = variants[0];
  const image = images[0].localFile;

  return (
    <ProductCardStyle>
      <ProductCardImage img={image} />
      <h3>
        <Link to={handle}>{title}</Link>
      </h3>
      <h4>{product.model}</h4>
      <p>{product.description}</p>
    </ProductCardStyle>
  );
}
