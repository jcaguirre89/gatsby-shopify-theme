import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import ProductCardImage from './ProductCardImage';
import MonetaryValue from './MonetaryValue';

const ProductCardStyle = styled.div`
  background: ${props => props.theme.background};
  border: 0px solid;
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  h3 {
    font-weight: 700;
    margin: 10px auto;
    text-transform: uppercase;
  }
  p {
    font-size: 1.3rem;
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
  const { storePath } = data.site.siteMetadata;

  return (
    <ProductCardStyle>
      <ProductCardImage
        handle={handle}
        variantId={variantId}
        image={firstImage.localFile.childImageSharp.fluid}
        storePath={storePath}
      />
      <Content>
        <Link to={`${storePath}/${handle}`}>
          <h3>{title}</h3>
        </Link>
        <MonetaryValue amount={price} />
      </Content>
    </ProductCardStyle>
  );
}
