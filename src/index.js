import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import 'tailwindcss/src/index.css'
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);