import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './utils/theme';

const GlobalStyles = createGlobalStyle` 
  ${reset}

  @font-face {
    font-family: 'YClover-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/YClover-Bold.woff2') format('woff2');
    font-style: normal;
    font-weight: 400;
  }

  @font-face {
    font-family: 'YUniverse-B';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_yuniverse@1.0/YUniverse-B.woff2') format('woff2');
    font-style: normal;
    font-weight: 700;
  }

  * {
    box-sizing: border-box;
    font-family: 'YClover-Bold';
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
  }

  #root {
    width: 100%;
    height: 100vh;
    background-color: ${theme.colors['--black-primary']};
    margin: auto;
    @media (min-width: ${theme.size.maxWidth}) {
      width: ${theme.size.maxWidth};
    }
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
`;

export default GlobalStyles;
