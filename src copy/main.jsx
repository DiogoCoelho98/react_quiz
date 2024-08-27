import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./components/App.jsx";
import './index.css'
import { QuizProvider } from './contexts/QuizContext.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </StrictMode>,
)
