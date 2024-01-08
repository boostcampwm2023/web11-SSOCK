import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@sentry/react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';
import { theme } from '@utils';
import { Song } from '@components';
import { HasSnowballData } from './router';
import { SnowBallProvider } from '@pages/Visit/SnowBallProvider';
import { MessageProvider } from '@pages/Visit/MessageProvider';
import { DecoProvider } from '@pages/Visit/Deco/DecoProvider';
import { MessageListProvider } from '@pages/Visit/MessageListProvider';

import { lazy, Suspense } from 'react';

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

const Intro = lazy(() => import('@pages/Intro/Intro'));
const Visit = lazy(() => import('@pages/Visit/Visit'));
const Deco = lazy(() => import('@pages/Visit/Deco/Deco'));
const Nickname = lazy(() => import('@pages/Make/Nickname/Nickname'));
const Snowball = lazy(() => import('@pages/Make/Snowball/Snowball'));
const Main = lazy(() => import('@pages/Main/Main'));
const Wrong = lazy(() => import('@pages/Wrong/Wrong'));

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Outer>
            <Song />
            <Suspense fallback={<></>}>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <MessageListProvider>
                      <Intro />
                    </MessageListProvider>
                  }
                />

                <Route
                  path="/visit/:user"
                  element={
                    <DecoProvider>
                      <MessageProvider>
                        <SnowBallProvider>
                          <MessageListProvider>
                            <Outlet />
                          </MessageListProvider>
                        </SnowBallProvider>
                      </MessageProvider>
                    </DecoProvider>
                  }
                >
                  <Route path="" element={<Visit />} />
                  <Route path="deco" element={<Deco />} />
                </Route>

                <Route
                  path="/make"
                  element={
                    <SnowBallProvider>
                      <HasSnowballData>
                        <Outlet />
                      </HasSnowballData>
                    </SnowBallProvider>
                  }
                >
                  <Route path="nickname" element={<Nickname />} />
                  <Route path="snowball" element={<Snowball />} />
                </Route>

                <Route
                  path="/main"
                  element={
                    <MessageProvider>
                      <SnowBallProvider>
                        <MessageListProvider>
                          <Main />
                        </MessageListProvider>
                      </SnowBallProvider>
                    </MessageProvider>
                  }
                />
                <Route path="*" element={<Wrong />} />
              </Routes>
            </BrowserRouter>
            </Suspense>
          </Outer>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
