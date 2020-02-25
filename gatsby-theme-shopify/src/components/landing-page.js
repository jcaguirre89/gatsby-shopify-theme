import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default function LandingPage() {
  const data = useStaticQuery(graphql`
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
  `);
  return (
    <OuterWrapper>
      <h2>Welcome to the landing page!</h2>
      <Img fixed={data.file.childImageSharp.fixed} />
    </OuterWrapper>
  );
}
