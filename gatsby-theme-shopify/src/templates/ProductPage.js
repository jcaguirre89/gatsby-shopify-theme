import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

export default function ProductPage({ data }) {
  const product = data.shopifyProduct;
  console.log(product);
  return (
    <>
      <SEO title={product.title} description={product.description} />
      {product.images.map(image => (
        <Img
          fluid={image.localFile.childImageSharp.fluid}
          key={image.id}
          alt={product.title}
        />
      ))}
      <h2>{product.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></p>
    </>
  );
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      descriptionHtml
      images {
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
      variants {
        id
        price
      }
    }
  }
`;
