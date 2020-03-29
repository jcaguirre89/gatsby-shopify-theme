import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import ProductCardImage from './ProductCardImage';
import MonetaryValue from './MonetaryValue';

const ProductCardStyle = styled.div`
  background: ${props => props.theme.colors.background};
  border: 0;
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
    font-weight: ${props => props.theme.fontWeights.heading};
    color: ${props => props.theme.colors.accent};
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
          gatsbyStorefrontConfig {
            storePath
          }
        }
      }
    }
  `);
  const {
    title,
    handle,
    variants: [firstVariant],
    images: [firstImage],
  } = product;
  const { id: variantId, price } = firstVariant;
  const { storePath } = data.site.siteMetadata.gatsbyStorefrontConfig;

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
