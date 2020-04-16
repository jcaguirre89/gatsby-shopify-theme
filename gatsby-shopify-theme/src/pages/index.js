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
  query HomeLandingQuery {
    landingPage: sanityLandingPage(page: { eq: "home" }) {
      id
      _rawBody
      title
      subtitle
      contentLocation
      textColor
      cta {
        link
        text
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
