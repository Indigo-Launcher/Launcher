import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AppDataProvider } from './app/providers/AppDataProvider.jsx';
import { AuthProvider } from './app/providers/AuthProvider.jsx';
import { DemoStoreProvider } from './app/providers/DemoStoreProvider.jsx';
import { ThemeProvider } from './app/providers/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AppDataProvider>
          <DemoStoreProvider>
            <App />
          </DemoStoreProvider>
        </AppDataProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
