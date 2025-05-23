import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ScoutingReportProvider } from './utils/ScoutingReportContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ScoutingReportProvider>
      <App />
    </ScoutingReportProvider>
  </React.StrictMode>
);
