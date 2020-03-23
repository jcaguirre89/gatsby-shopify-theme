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
  const {
    title,
    description,
    handle,
    variants: [firstVariant],
    images: [firstImage],
  } = product;
  const { id: variantId, price } = firstVariant;
  const image = firstImage.localFile.childImageSharp.fluid;

  return (
    <ProductCardStyle>
      <ProductCardImage variantId={variantId} image={image} />
      <h3>
        <Link to={`store/${handle}`}>{title}</Link>
      </h3>
      <p>{description}</p>
    </ProductCardStyle>
  );
}
