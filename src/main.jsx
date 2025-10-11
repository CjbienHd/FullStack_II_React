import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import Nav from './components/Nav.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home></Home>}></Route>
        <Route path = "/productos" element={<Productos></Productos>}></Route>
        <Route path = "/home" element = {<Home/>}></Route>
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
