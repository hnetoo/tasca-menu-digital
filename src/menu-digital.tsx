import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicMenu from '../pages/PublicMenu.tsx'
import '../index.css'

// Menu Digital standalone - não requer autenticação
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/menu-digital">
      <Routes>
        <Route path="/" element={<PublicMenu />} />
        <Route path="/:tableId" element={<PublicMenu />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)