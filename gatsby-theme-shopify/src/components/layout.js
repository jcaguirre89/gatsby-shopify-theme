import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  offWhite: "#f0ead6",
  black: "#313639",
  maxWidth: "1000px"
};

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
        <div>
          <h1>Gatsby Products Theme</h1>
          {children}
        </div>
      </ThemeProvider>
    </>
  );
};
export default Layout;
