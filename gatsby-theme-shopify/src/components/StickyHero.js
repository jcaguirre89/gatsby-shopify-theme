import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Header from './header';

const StickyHeroOuter = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const HeaderContainer = styled.div`
  position: absolute;
  top: 0px;
  z-index: 10;
  width: 100%;
`;

export default function StickyHero() {
  const data = useStaticQuery(HERO_QUERY);

  return (
    <StickyHeroOuter>
      <HeaderContainer>
        <Header transparent />
      </HeaderContainer>
      <Img fluid={data.allSanityHero.edges[0].node.background.asset.fluid} />
      <HeroContent>
        <h2>{data.allSanityHero.edges[0].node.title}</h2>
        <h3>{data.allSanityHero.edges[0].node.subtitle}</h3>
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
