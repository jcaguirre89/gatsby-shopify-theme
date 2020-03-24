import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import ProductCardImage from './ProductCardImage';

const ProductCardStyle = styled.div`
  background: ${props => props.theme.background};
  border: 0px solid;
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
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          storePath
        }
      }
    }
  `);
  const {
    title,
    description,
    handle,
    variants: [firstVariant],
    images: [firstImage],
  } = product;
  const { id: variantId, price } = firstVariant;
  const image = firstImage.localFile.childImageSharp.fluid;
  const { storePath } = data.site.siteMetadata;

  return (
    <ProductCardStyle>
      <ProductCardImage
        handle={handle}
        variantId={variantId}
        image={image}
        storePath={storePath}
      />
      <Link to={`${storePath}/${handle}`}>
        <h3>{title}</h3>
      </Link>
      <p>{description}</p>
    </ProductCardStyle>
  );
}
