import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { IsLogin, HasSnowball } from './router';
import { Intro, Nickname, Snowball, Main, Visit, Deco, Wrong } from './pages';
import { Song } from './components';
import theme from './utils/theme';
import styled from 'styled-components';

const Outer = styled.div`
  position: relative;

  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  height: 100%;
  /* ::-webkit-scrollbar {
    display: none;
  } */

  //overflow: hidden;

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    width: ${theme.size['--desktop-width']};
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Outer>
        <Song />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />

            <Route path="/visit/:user" element={<Outlet />}>
              <Route path="" element={<Visit />} />
              <Route path="deco" element={<Deco />} />
            </Route>

            <Route
              path="/make"
              element={
                <IsLogin>
                  <HasSnowball>
                    <Outlet />
                  </HasSnowball>
                </IsLogin>
              }
            >
              <Route path="" element={<Nickname />} />
              <Route path="snowball" element={<Snowball />} />
            </Route>

            <Route
              path="/main"
              element={
                <IsLogin>
                  <Main />
                </IsLogin>
              }
            />

            <Route path="*" element={<Wrong />} />
          </Routes>
        </BrowserRouter>
      </Outer>
    </>
  );
};

export default App;
