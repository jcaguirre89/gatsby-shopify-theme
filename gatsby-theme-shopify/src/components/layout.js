import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from './header';

const theme = {
  white: '#fff',
  offWhite: '#f0ead6',
  black: '#313639',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  background: ${theme.white};
  color: ${theme.black};
`;

const Inner = styled.div`
  max-width: ${theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
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
        <StyledPage>
          {/* <Meta /> */}
          <Header />
          <Inner>{children}</Inner>
        </StyledPage>
      </ThemeProvider>
    </>
  );
};
export default Layout;
