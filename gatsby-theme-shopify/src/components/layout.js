import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from './header';
import SEO from './SEO';

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
    line-height: 2;
    color: ${theme.black}
  }
  a {
    text-decoration: none;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <SEO />
          <Header />
          <Inner>{children}</Inner>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};
export default Layout;
