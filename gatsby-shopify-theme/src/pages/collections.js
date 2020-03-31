import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import CollectionList from '../components/CollectionList';
import Header from '../components/header';

const Content = styled.div`
  margin: 0;
  background: ${props => props.theme.colors.background};
`;

export default function Collections({ data }) {
  const collections = data.collections.nodes;
  return (
    <Layout>
      <Header />
      <Content>
        <CollectionList collections={collections} />
      </Content>
    </Layout>
  );
}

export const query = graphql`
  query HomeQuery {
    collections: allShopifyCollection {
      nodes {
        descriptionHtml
        handle
        title
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
