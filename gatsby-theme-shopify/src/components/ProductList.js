import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import ProductCard from './ProductCard';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  console.log(products);
  return (
    <>
      <h2>Product List</h2>
      <ProductGrid>
        {products.map(product => (
          <ProductCard product={product} />
        ))}
      </ProductGrid>
    </>
  );
}
