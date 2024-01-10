import { Suspense } from 'react';
import { ErrorBoundary } from '@sentry/react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';
import { theme } from '@utils';
import { Song } from '@components';
import { Router } from './router';

const Outer = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    width: ${theme.size['--desktop-width']};
  }
`;

const App = () => {
  return (
    <ErrorBoundary>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Outer>
          <Song />
          <Suspense fallback={<></>}>
            <Router />
          </Suspense>
        </Outer>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
