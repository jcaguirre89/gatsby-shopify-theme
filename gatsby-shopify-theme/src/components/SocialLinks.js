import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { FaInstagram, FaFacebookSquare, FaTwitter } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  a {
    font-weight: ${props => props.theme.fontWeights.bold};
    margin-right: 10px;
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

export default function SocialLinks() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          instagramHandle
          facebookHandle
          twitterHandle
        }
      }
    }
  `);
  const {
    instagramHandle,
    facebookHandle,
    twitterHandle,
  } = data.site.siteMetadata;
  return (
    <Wrapper>
      {instagramHandle && (
        <a
          href={`https://www.instagram.com/${instagramHandle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      )}
      {facebookHandle && (
        <a
          href={`https://www.facebook.com/${facebookHandle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare />
        </a>
      )}
      {twitterHandle && (
        <a
          href={`https://www.twitter.com/${twitterHandle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
      )}
    </Wrapper>
  );
}
