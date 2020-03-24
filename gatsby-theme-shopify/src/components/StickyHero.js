import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const StickyHeroOuter = styled.section`
  width: 100vw;
  height: 90vh;
  position: relative;
`;

const handleHeroContentLocation = location => {
  switch (location) {
    case 'left':
      return 'translateX(-80%)';
    case 'right':
      return 'translateX(80%)';
    case 'center':
      return 'translateX(0%)';
    default:
      return 'translateX(0%)';
  }
};

const HeroContent = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  max-width: 50%;
  transform: translateY(-50%)
    ${({ location }) => handleHeroContentLocation(location)};
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
    transform: translateX(0) translateY(0);

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
  const {
    background,
    title,
    subtitle,
    content_location,
  } = data.allSanityHero.edges[0].node;

  return (
    <StickyHeroOuter>
      <Img fluid={background.asset.fluid} style={{ height: '100%' }} />
      <HeroContent location={content_location}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </HeroContent>
    </StickyHeroOuter>
  );
}

const HERO_QUERY = graphql`
  query {
    allSanityHero(filter: { publish: { eq: true } }) {
      edges {
        node {
          title
          subtitle
          content_location
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
