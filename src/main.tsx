import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { DarkModeProvider } from './contexts/DarkModeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </DarkModeProvider>
  </StrictMode>,
)
