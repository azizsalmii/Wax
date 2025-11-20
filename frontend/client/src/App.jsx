import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import About from './pages/About';
import Reclamation from './pages/Reclamation';

import Navbar from './components/navbar/Navbar';
import Preloader from './components/Preloader';

import './styles.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // durée totale du loader (en ms)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Écran de chargement au-dessus de tout */}
      {loading && <Preloader />}

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produits" element={<AllProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/reclamation" element={<Reclamation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
