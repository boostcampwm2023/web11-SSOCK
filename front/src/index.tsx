import ReactDOM from 'react-dom/client';
import { init, BrowserTracing, Replay } from '@sentry/react';
import App from './App';

init({
  dsn: import.meta.env.VITE_APP_SENTRY_DSN,
  integrations: [
    new BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/mysnowball\.kr\/api/]
    }),
    new Replay()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
