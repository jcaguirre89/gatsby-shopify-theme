import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from 'gatsby';
import {
  FaLongArrowAltRight,
  FaInstagram,
  FaFacebookSquare,
  FaTwitter,
} from 'react-icons/fa';
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from '../context/GlobalContextProvider';

const MenuStyles = styled.div`
  position: fixed;
  top: 90px;
  left: 0;
  bottom: 0;
  z-index: 5;
  min-width: 300px;
  max-width: 400px;
  width: 40%;
  height: 100%;
  padding: 20px;
  background: ${props => props.theme.colors.background};
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  ${props => props.open && `transform: translateX(0);`};
  display: flex;
  flex-direction: column;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    min-width: auto;
    width: 100%;
  }
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 170px;
    width: 100%;
    list-style: none;
  }

  a {
    font-size: 3.5rem;
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.primary};
    margin-right: 10px;
  }

  .close-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export default function Menu() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          email
          phone
          instagramHandle
          facebookHandle
          twitterHandle
          gatsbyStorefrontConfig {
            storePath
            collectionsPath
          }
        }
      }
    }
  `);
  const {
    email,
    phone,
    instagramHandle,
    facebookHandle,
    twitterHandle,
    gatsbyStorefrontConfig: { storePath, collectionsPath },
  } = data.site.siteMetadata;
  const { isMenuOpen } = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  return (
    <MenuStyles open={isMenuOpen}>
      <button
        className="close-button"
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
      >
        <FaLongArrowAltRight size={30} />
      </button>
      <ul>
        <Link
          onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
          to={`${storePath}`}
        >
          Store
        </Link>
      </ul>
      <div>
        <h3>Have Questions?</h3>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
      <div>
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
      </div>
    </MenuStyles>
  );
}
