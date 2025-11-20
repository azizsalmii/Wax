import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false); // ferme le menu mobile à chaque changement de page
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/produits", label: "Produits" },
    { to: "/collection", label: "Collection" },
    { to: "/feedback", label: "Feedback" },
    { to: "/apropos", label: "À propos" },
    { to: "/contact", label: "Contact" }
  ];

  // 🔥 Choix du logo selon scroll
  const logoSrc = scrolled
    ? "/assets/Logo_wax_white.png"   // logo blanc (navbar noire)
    : "/assets/Logo_wax.png";        // logo noir (fond transparent)

  return (
    <header className={`main-navbar ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Desktop Navbar */}
      <div className="navbar-container">
        
        {/* Menu gauche */}
        <nav className="nav-left">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logo centré */}
        <div className="navbar-logo">
          <NavLink to="/">
            <img src={logoSrc} alt="WAX Logo" className="logo-img" />
          </NavLink>
        </div>

        {/* Icône panier à droite */}
        <div className="nav-right">
          <button className="icon-btn" aria-label="Panier">
            🛒
          </button>
        </div>
      </div>

      {/* Hamburger mobile */}
      <button
        className={`hamburger ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Ouvrir le menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Menu mobile */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} className="mobile-link">
            {item.label}
          </NavLink>
        ))}
        <div className="mobile-actions">
          <span className="mobile-cart" aria-label="Panier" role="button">
            🛒
          </span>
        </div>
      </div>
    </header>
  );
}
