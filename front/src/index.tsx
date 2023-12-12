import ReactDOM from 'react-dom/client';
import App from './App';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_APP_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/mysnowball\.kr\/api/]
    }),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
