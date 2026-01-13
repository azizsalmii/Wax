// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

// Pages principales
import Home from "./pages/Home";
import About from "./pages/About";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import Feedback from "./pages/Feedback";
import Contact from "./pages/Contact";
import CollectionPage from "./pages/CollectionPage";
import CollectionDetailPage from "./pages/CollectionDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Toutes les pages passent par Layout (Navbar + Footer + CartDrawer) */}
        <Route element={<Layout />}>
          
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* À PROPOS */}
          <Route path="/about" element={<About />} />

          {/* PRODUITS */}
          <Route path="/produits" element={<ProductPage />} />
          <Route path="/produit/:id" element={<ProductDetail />} />

          {/* COLLECTIONS */}
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/collection/:id" element={<CollectionDetailPage />} />

          {/* FEEDBACK */}
          <Route path="/feedback" element={<Feedback />} />

          {/* CONTACT */}
          <Route path="/contact" element={<Contact />} />

          {/* ❌ IMPORTANT : PAS DE ROUTE /panier 
              → car ton mini-panier est maintenant un CartDrawer */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
