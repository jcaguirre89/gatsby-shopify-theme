import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const StickyHeroOuter = styled.section`
  width: 100vw;
  height: 90vh;
`;

const HeroContent = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  max-width: 50%;
  transform: translateY(-50%);
  right: 0;
  top: 50%;
  color: ${props => props.theme.white};

  h2 {
    font-size: 3rem;
  }

  h3 {
    font-size: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.m}) {
    top: auto;
    right: 20%;
    bottom: 10%;
    transform: translateY(0);

    h2 {
      font-size: 2.5rem;
    }

    h3 {
      font-size: 2rem;
    }
  }
`;

export default function StickyHero() {
  const data = useStaticQuery(HERO_QUERY);
  const { background, title, subtitle } = data.allSanityHero.edges[0].node;

  return (
    <StickyHeroOuter>
      <Img fluid={background.asset.fluid} style={{ height: '100%' }} />
      <HeroContent>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </HeroContent>
    </StickyHeroOuter>
  );
}

const HERO_QUERY = graphql`
  query {
    allSanityHero {
      edges {
        node {
          title
          subtitle
          background {
            asset {
              fluid(maxWidth: 910) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`;
