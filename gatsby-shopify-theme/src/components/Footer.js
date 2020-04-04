import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Logo from './Logo';
import SocialLinks from './SocialLinks';

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  place-items: center;
`;

const SocialLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          email
          phone
        }
      }
    }
  `);
  const { email, phone, title } = data.site.siteMetadata;
  return (
    <Container>
      <Link to="/">
        <Logo color="black" />
      </Link>
      <div>
        <h3>Have Questions?</h3>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
      <SocialLinksContainer>
        <SocialLinks size="20px" />
        <p>
          © {new Date().getFullYear()} {title}
        </p>
      </SocialLinksContainer>
    </Container>
  );
}
