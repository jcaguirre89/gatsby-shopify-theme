export const breakpoints = {
  s: '400px',
  m: '700px',
  l: '900px',
};

const theme = {
  breakpoints,
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#8b6508',
    secondary: '#cd950c',
    accent: '#000033',
    muted: '#f6f6f6f',
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Spartan, sans serif',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  red: '#FF0000',
  gold: '#9d8755',
  black: '#000',
  offBlack: '#393939',
  grey: '#808080',
  lightGrey: '#d1d1cf',
  blue: 'rgb(43, 20, 83)',
  green: '#00ffff',
  offWhite: '#EDEDED',
  white: '#fff',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

export default theme;
