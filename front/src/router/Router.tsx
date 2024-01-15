import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

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
          <Route path="/" element={<Intro />} />

          <Route path="/visit/:user" element={<Outlet />}>
            <Route path="" element={<Visit />} />
            <Route path="deco" element={<Deco />} />
          </Route>

          <Route path="/make" element={<Outlet />}>
            <Route path="nickname" element={<Nickname />} />
            <Route path="snowball" element={<Snowball />} />
          </Route>

          <Route path="/main" element={<Main />} />
          <Route path="*" element={<Wrong />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Router;
