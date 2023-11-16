import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { Intro, Nickname, Snowball, Main, Visit, Wrong } from './pages';
import { IsLogin, HasSnowball } from './router';

const App = () => {
  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/visit/:userId" element={<Visit />} />

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
    </>
  );
};

export default App;
