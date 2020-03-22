import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import Layout from '../components/layout';
import Header from '../components/header';

export default function ProductPage({ data }) {
  const product = data.shopifyProduct;
  return (
    <Layout>
      <SEO title={product.title} description={product.description} />
      <Header />
      {product.images.map(image => (
        <Img
          fluid={image.localFile.childImageSharp.fluid}
          key={image.id}
          alt={product.title}
        />
      ))}
      <h2>{product.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></p>
    </Layout>
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
