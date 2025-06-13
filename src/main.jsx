import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { MobileMenuProvider } from './Components/MobileMenuContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <MobileMenuProvider>
      <App />
      </MobileMenuProvider>
    </BrowserRouter>
  </StrictMode>,
)
