import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { theme } from '@utils';

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

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'KingSejongInstitute';
    src: url('/fonts/KingSejongInstitute-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(0, 100%);
    }
    to {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes fadeOutUp {
    from {
      opacity: 1;
      transform: translate(0, 0);
    }
    to {
      opacity: 0;
      transform: translate(0, -100%);
    }
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
      transform: translate(0, 0);
    }
    to {
      opacity: 0;
      transform: translate(0, 100%);
    }
  }

  * {
    box-sizing: border-box;
    font-family: 'KingSejongInstitute';
    white-space: nowrap;
    &::-webkit-scrollbar {
      display: none;
    }
    overflow: hidden;
  }

  html {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    margin:0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  
  #root {
    width: 100%;
    height: 100%;
    display: grid;
    background-color: ${theme.colors['--primary-black']};
    margin: auto;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    color: black;
    pointer-events: all;
  }

  img {
    cursor: pointer;
    pointer-events: all;
  }

  hr {
    margin: 0;
  }

  div, span{
    user-select: none;
  }
`;

export default GlobalStyles;
