import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import LandingPage from '../components/LandingPage';
import Layout from '../components/layout';
import Header from '../components/header';

export default function Home({ data }) {
  const landingPage = data && data.landingPage;
  return (
    <Layout>
      <Header smart />
      <LandingPage {...landingPage} />
    </Layout>
  );
}

export const query = graphql`
  query AboutLandingQuery {
    landingPage: sanityLandingPage(page: { eq: "about" }) {
      id
      _rawBody
      title
      subtitle
      textColor
      contentLocation
      cta {
        link
        text
      }
      handle {
        current
      }
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
        }
        alt
      }
    }
  }
`;
