import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const StickyHeroOuter = styled.section`
  position: fixed;
  top: 0px;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
`;

const StickyHeroInner = styled.div`
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
`;

const HERO_QUERY = graphql`
  query {
    allSanityHero {
      edges {
        node {
          title
          subtitle
          background {
            asset {
              fluid(maxWidth: 700) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`;

export default function StickyHero() {
  const data = useStaticQuery(HERO_QUERY);

  return (
    <StickyHeroOuter>
      <StickyHeroInner>
        <Img fluid={data.allSanityHero.edges[0].node.background.asset.fluid} />
        <HeroContent>
          <h2>{data.allSanityHero.edges[0].node.title}</h2>
          <h3>{data.allSanityHero.edges[0].node.subtitle}</h3>
        </HeroContent>
      </StickyHeroInner>
    </StickyHeroOuter>
  );
}
