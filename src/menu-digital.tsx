import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicMenu from '../pages/PublicMenu.tsx'
import '../index.css'

// Menu Digital standalone - não requer autenticação
const root = ReactDOM.createRoot(document.getElementById('root')!)

// Remover o loading existente antes de renderizar o React
const loadingElement = document.querySelector('.loading')
if (loadingElement) {
  loadingElement.remove()
}

// Remover o loading e mostrar o conteúdo do React
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/menu-digital">
      <Routes>
        <Route path="/" element={<PublicMenu />} />
        <Route path="/:tableId" element={<PublicMenu />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)