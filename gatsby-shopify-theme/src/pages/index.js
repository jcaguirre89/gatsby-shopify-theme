import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import CollectionList from '../components/CollectionList';
import Header from '../components/header';
import Hero from '../components/Hero';

const Content = styled.div`
  margin: 0;
  background: ${props => props.theme.colors.background};
`;

const ctas = [{ text: 'Shop Now', link: '/store' }];

export default function Home({ data }) {
  const collections = data.collections.nodes;
  const {
    background,
    title,
    subtitle,
    content_location,
  } = data.allSanityHero.edges[0].node;
  return (
    <Layout>
      <Header smart />
      <Hero
        title={title}
        subtitle={subtitle}
        contentLocation={content_location}
        imageFluid={background.asset.fluid}
        ctas={ctas}
      />
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
    allSanityHero(filter: { publish: { eq: true } }) {
      edges {
        node {
          title
          subtitle
          content_location
          background {
            asset {
              fluid(maxWidth: 1400) {
                ...GatsbySanityImageFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
