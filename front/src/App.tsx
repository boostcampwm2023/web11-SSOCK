import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { Intro, Make, Main, Visit, Wrong } from './pages';
import { IsLogin, HasSnowGlobe } from './router';

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
                <HasSnowGlobe>
                  <Make />
                </HasSnowGlobe>
              </IsLogin>
            }
          />

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
