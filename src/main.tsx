import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import ThemeProvider from './providers/ThemeProvider';
import { store } from './store';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
