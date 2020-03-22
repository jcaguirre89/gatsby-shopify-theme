import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const StickyHeroStyle = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0px;
`;

const HERO_QUERY = graphql`
  query {
    file(relativePath: { eq: "landing/test.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 800) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default function StickyHero() {
  const data = useStaticQuery(HERO_QUERY);
  return (
    <StickyHeroStyle>
      <Img src={data.file.childImageSharp.fixed} />
    </StickyHeroStyle>
  );
}
