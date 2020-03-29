import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import SEO from './SEO';
import Cart from './Cart';
import SideMenu from './SideMenu';
import Footer from './Footer';
import theme from './styles/theme';

const Wrapper = styled.div`
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Inner = styled.div`
  padding-bottom: 50px;
  box-shadow: 0px 100px 3px -100px #393939;
`;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-family: ${theme.fonts.body};
    line-height: ${theme.lineHeights.body};
    color: ${theme.black};
  }
  h1,h2,h3,h3,h5,h6 {
    font-family: ${theme.fonts.heading};
    line-height: ${theme.lineHeights.heading};


  }
  a {
    text-decoration: none;
    color: ${theme.colors.primary}
  }
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <link
      href="https://fonts.googleapis.com/css?family=Playfair+Display:900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Spartan&display=swap"
      rel="stylesheet"
    ></link>
    <ThemeProvider theme={theme}>
      <Wrapper>
        <SEO />
        <Cart />
        <SideMenu />
        <Inner>{children}</Inner>
        <Footer />
      </Wrapper>
    </ThemeProvider>
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.element,
};
