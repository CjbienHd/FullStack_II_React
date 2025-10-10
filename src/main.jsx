import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import Nav from './components/Nav.jsx'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <Home></Home>
    </BrowserRouter>

  </StrictMode>,
)
