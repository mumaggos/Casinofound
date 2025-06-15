import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';
import './lib/i18n';
import { SettingsProvider } from './contexts/SettingsContext';
import { Web3Provider } from './contexts/Web3Context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <Web3Provider>
          <App />
        </Web3Provider>
      </SettingsProvider>
    </BrowserRouter>
  </StrictMode>
);

