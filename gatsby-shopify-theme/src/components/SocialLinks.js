import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { FaInstagram, FaFacebookSquare, FaTwitter } from 'react-icons/fa';

const Wrapper = styled.div`
  width: 150px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  a {
    margin-right: 10px;
    font-size: ${props => props.size};
    color: ${props => props.color};
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

export default function SocialLinks({ size, color }) {
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
    <Wrapper size={size} color={color}>
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

SocialLinks.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

SocialLinks.defaultProps = {
  color: 'black',
  size: '24px',
};
