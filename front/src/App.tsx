import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';
import { theme } from './utils';
import { IsLogin, IsSnowballData } from './router';
import {
  Intro,
  Nickname,
  Snowball,
  Main,
  Visit,
  Deco,
  Wrong,
  Boostcamp
} from './pages';
import { Song } from './components';

const Outer = styled.div`
  position: relative;

  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  height: 100%;
  /* ::-webkit-scrollbar {
    display: none;
  } */

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    width: ${theme.size['--desktop-width']};
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
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
                  <IsSnowballData>
                    <Outlet />
                  </IsSnowballData>
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

              <Route path="/boostcamp" element={<Boostcamp />} />
              <Route path="*" element={<Wrong />} />
            </Routes>
          </BrowserRouter>
        </Outer>
      </ThemeProvider>
    </>
  );
};

export default App;
