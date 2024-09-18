import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as RedaxProvider } from 'react-redux';

import { store } from '../appStore';
import { baseLayout } from '../layout/baseLayout';

import '../styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RedaxProvider store={store}>{baseLayout}</RedaxProvider>
  </StrictMode>,
);
