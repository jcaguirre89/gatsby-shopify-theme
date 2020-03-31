import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import LandingPage from '../components/LandingPage';
import Layout from '../components/layout';
import Header from '../components/header';

export default function Home({ data }) {
  console.log(process.env.SANITY_DATASET);
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
    landingPage: sanityLandingPage(handle: { current: { eq: "home-page" } }) {
      id
      _rawBody
      title
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
