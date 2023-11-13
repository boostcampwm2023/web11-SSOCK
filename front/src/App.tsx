import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { Intro, Make, Main, Visit, Wrong } from './pages';

const App = () => {
  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/make" element={<Make />} />
          <Route path="/main" element={<Main />} />
          <Route path="/visit/:userId" element={<Visit />} />

          <Route path="*" element={<Wrong />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
