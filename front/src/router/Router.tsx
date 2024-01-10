import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HasSnowballData from './HasSnowballData';
import { SnowBallProvider } from '@pages/Visit/SnowBallProvider';
import { DecoProvider } from '@pages/Visit/Deco/DecoProvider';
import { MessageListProvider } from '@pages/Visit/MessageListProvider';

const Intro = lazy(() => import('@pages/Intro/Intro'));
const Visit = lazy(() => import('@pages/Visit/Visit'));
const Deco = lazy(() => import('@pages/Visit/Deco/Deco'));
const Nickname = lazy(() => import('@pages/Make/Nickname/Nickname'));
const Snowball = lazy(() => import('@pages/Make/Snowball/Snowball'));
const Main = lazy(() => import('@pages/Main/Main'));
const Wrong = lazy(() => import('@pages/Wrong/Wrong'));

const Router = () => {
  return (
    <RecoilRoot>
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
                <SnowBallProvider>
                  <MessageListProvider>
                    <Outlet />
                  </MessageListProvider>
                </SnowBallProvider>
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
              <SnowBallProvider>
                <MessageListProvider>
                  <Main />
                </MessageListProvider>
              </SnowBallProvider>
            }
          />
          <Route path="*" element={<Wrong />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Router;
