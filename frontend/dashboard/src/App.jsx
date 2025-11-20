import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardHome from './pages/DashboardHome'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Reclamations from './pages/Reclamations'
import './styles.css'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardHome/>} />
        <Route path="/produits" element={<Products/>} />
        <Route path="/commandes" element={<Orders/>} />
        <Route path="/reclamations" element={<Reclamations/>} />
      </Routes>
    </BrowserRouter>
  )
}
