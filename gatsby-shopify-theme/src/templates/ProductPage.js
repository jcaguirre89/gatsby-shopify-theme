/* eslint-disable react/prop-types, react/no-danger */

import React, { useContext, useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';
import Layout from '../components/layout';
import Header from '../components/header';
import { formatMoney } from '../components/MonetaryValue';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';
import BaseButton from '../components/styles/BaseButton';
import ProductList from '../components/ProductList';
import VariantPicker from '../components/VariantPicker';
import ImgZoom from '../components/ImgZoom';

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 100px;
  width: 100%;
  margin: 0;
  margin-top: 100px;
  padding: 0 20px;

  h2 {
    text-transform: uppercase;
    font-size: 4rem;
    margin-bottom: 0;
    color: ${props => props.theme.colors.primary};
  }

  h3 {
    text-transform: uppercase;
    font-family: ${props => props.theme.fonts.body};
    font-size: 2.5rem;
  }

  .price {
    color: ${props => props.theme.colors.grey};
    font-size: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.m}) {
    grid-gap: 40px;
    padding: 0;
    margin-bottom: 100px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  button {
    max-width: 350px;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    align-items: center;
    padding: 0;
    p {
      padding: 0 10px;
    }
  }
`;

const RelatedContainer = styled.div`
  background: ${props => props.theme.colors.muted};
  padding: 50px 0 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  h2 {
    font-size: 3rem;
    margin-bottom: 50px;
  }
`;

const StyledProductList = styled(ProductList)`
  width: 90%;
  margin: auto;
`;

export default function ProductPage({ data }) {
  const { title, description, descriptionHtml, variants } = data.shopifyProduct;

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const products = data.products.nodes;
  const dispatch = useContext(GlobalDispatchContext);
  const { isCartOpen } = useContext(GlobalStateContext);

  const handleClick = () => {
    dispatch({
      type: 'UPDATE_CART',
      payload: { variantId: selectedVariant.id, quantity: 1 },
    });
    if (!isCartOpen) {
      dispatch({ type: 'TOGGLE_CART' });
    }
  };

  return (
    <Layout>
      <SEO title={title} description={description} />
      <Header smart={false} />
      <Container>
        <ImgZoom
          fluid={selectedVariant.image.localFile.childImageSharp.fluid}
        />
        <ContentContainer>
          <h2>{title}</h2>
          {variants.length > 1 && <h3>{selectedVariant.title}</h3>}
          {variants.length > 1 && (
            <VariantPicker
              variants={variants}
              selectedVariantId={selectedVariant.id}
              setSelectedVariant={setSelectedVariant}
            />
          )}
          <p className="price">{formatMoney(selectedVariant.price)}</p>
          <p dangerouslySetInnerHTML={{ __html: descriptionHtml }}></p>
          <BaseButton type="button" onClick={() => handleClick()}>
            Add to Cart
          </BaseButton>
        </ContentContainer>
      </Container>
      {products && (
        <RelatedContainer>
          <h2>Shop other products</h2>
          <StyledProductList products={products} />
        </RelatedContainer>
      )}
    </Layout>
  );
}

export const query = graphql`
  query($handle: String!) {
    products: allShopifyProduct(
      sort: { order: DESC, fields: handle }
      filter: { handle: { ne: $handle }, availableForSale: { eq: true } }
    ) {
      nodes {
        title
        description
        handle
        availableForSale
        variants {
          id
          price
        }
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      description
      descriptionHtml
      variants {
        id
        price
        title
        availableForSale
        image {
          localFile {
            childImageSharp {
              fixed(width: 80, height: 80) {
                ...GatsbyImageSharpFixed_withWebp
              }
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
