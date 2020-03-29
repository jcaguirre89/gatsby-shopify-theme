import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Logo from './Logo';

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  place-items: center;
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
      <div>
        <Link to="/">
          <Logo color="black" />
        </Link>
        <p>
          © {new Date().getFullYear()} {title}
        </p>
      </div>
      <div>
        <h3>Have Questions?</h3>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    </Container>
  );
}
