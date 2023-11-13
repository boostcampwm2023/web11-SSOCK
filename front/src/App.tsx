import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { Intro, Make, Main, Visit, Wrong } from './pages';
import IsLogin from './router/IsLogin';

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
                <Make />
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
