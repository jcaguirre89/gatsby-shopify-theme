import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import ProductCard from './ProductCard';

const ProductGrid = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 10px;
  min-height: 500px;
`;

export default function ProductList() {
  const data = useStaticQuery(graphql`
    query allProducts {
      allShopifyProduct(sort: { order: DESC, fields: handle }) {
        nodes {
          variants {
            id
            price
          }
          images {
            localFile {
              childImageSharp {
                fluid(maxWidth: 910) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }

          title
          description
          handle
        }
      }
    }
  `);
  const products = data.allShopifyProduct.nodes;
  return (
    <ProductGrid>
      {products.map(product => (
        <ProductCard key={product.handle} product={product} />
      ))}
    </ProductGrid>
  );
}
