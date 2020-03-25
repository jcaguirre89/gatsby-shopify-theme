import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from './header';
import SEO from './SEO';
import Cart from './Cart';
import SideMenu from './SideMenu';

const breakpoints = {
  s: '400px',
  m: '700px',
  l: '900px',
};

const theme = {
  breakpoints,
  white: '#fff',
  offWhite: '#f0ead6',
  green: '#77dd77',
  black: '#313639',
  grey: '#aaa',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const Wrapper = styled.div`
  background: ${theme.white};
  color: ${theme.black};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Inner = styled.div`
  margin: 0;
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
    font-family: 'Spartan';
    line-height: 2;
    color: ${theme.black}
  }
  h1,h2,h3,h3,h5,h6 {
    font-family: 'Playfair Display';

  }
  a {
    text-decoration: none;
    color: ${theme.black}
  }
`;

const Layout = ({ children }) => {
  return (
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
          <Header />
          <Inner>{children}</Inner>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};
export default Layout;
