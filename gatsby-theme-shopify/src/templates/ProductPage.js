/* eslint-disable react/prop-types, react/no-danger */

import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import Layout from '../components/layout';
import Header from '../components/header';
import { formatMoney } from '../components/MonetaryValue';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';
import BaseButton from '../components/styles/BaseButton';

const Container = styled.div`
  transform: translateY(90px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 100px;
  width: 100%;
  padding: 0 20px;

  h2 {
    font-size: 4rem;
    text-transform: uppercase;
  }

  .price {
    color: ${props => props.theme.grey};
    font-size: 1.5rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 350px;
`;

const ImageContainer = styled.ul`
  height: 70vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

export default function ProductPage({ data }) {
  const {
    title,
    description,
    descriptionHtml,
    images,
    variants: [firstVariant],
  } = data.shopifyProduct;
  const { id: variantId, price } = firstVariant;
  const dispatch = useContext(GlobalDispatchContext);
  const { isCartOpen } = useContext(GlobalStateContext);

  const handleClick = () => {
    dispatch({ type: 'UPDATE_CART', payload: { variantId, quantity: 1 } });
    if (!isCartOpen) {
      dispatch({ type: 'TOGGLE_CART' });
    }
  };

  return (
    <Layout>
      <SEO title={title} description={description} />
      <Header smart={false} />
      <Container>
        <ImageContainer>
          {images.map(image => (
            <Img
              fluid={image.localFile.childImageSharp.fluid}
              key={image.id}
              alt={title}
              style={{ minHeight: '500px' }}
            />
          ))}
        </ImageContainer>
        <ContentContainer>
          <h2>{title}</h2>
          <p className="price">{formatMoney(price)}</p>
          <p dangerouslySetInnerHTML={{ __html: descriptionHtml }}></p>
          <BaseButton type="button" onClick={() => handleClick()}>
            Add to Cart
          </BaseButton>
        </ContentContainer>
      </Container>
    </Layout>
  );
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      description
      descriptionHtml
      images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 800) {
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
