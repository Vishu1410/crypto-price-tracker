import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom'
import CryptoContext from './CryptoContext.jsx'
import "react-alice-carousel/lib/alice-carousel.css";
import "./chartSetup.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
     <CryptoContext>
      <App />
      </CryptoContext>
      
    </StrictMode>,
  </BrowserRouter>
  
)
