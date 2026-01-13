// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

import { useCart } from "../../context/CartContext"; 
import CartDrawer from "../CartDrawer"; // Drawer luxe

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const location = useLocation();
  const { cart } = useCart(); // panier global

  // Fermer le menu mobile lors d’un changement de page
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/produits", label: "Produits" },
    { to: "/collection", label: "Collection" },
    { to: "/feedback", label: "Feedback" },
    { to: "/about", label: "À propos" },
    { to: "/contact", label: "Contact" },
  ];

  const logoSrc = "/assets/Logo_wax_white.png";

  return (
    <header
      className={`main-navbar ${scrolled ? "scrolled" : ""} ${
        mobileOpen ? "mobile-open" : ""
      }`}
    >
      <div className="navbar-container">

        {/* =======================
              NAVIGATION GAUCHE
        ======================== */}
        <nav className="nav-left">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* =======================
                LOGO CENTRE
        ======================== */}
        <div className="navbar-logo">
          <NavLink to="/">
            <img src={logoSrc} alt="WAX Logo" className="logo-img" />
          </NavLink>
        </div>

        {/* =======================
             PANIER À DROITE
        ======================== */}
        <div className="nav-right">
          <div
            className="cart-icon-wrapper"
            onClick={() => setOpenDrawer(true)}
            role="button"
          >
            🛒
            {cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
          </div>
        </div>
      </div>

      {/* =======================
            MENU MOBILE
      ======================== */}
      <button
        className={`hamburger ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Ouvrir le menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="mobile-link">
            {item.label}
          </NavLink>
        ))}

        {/* ICON DU PANIER MOBILE */}
        <div
          className="mobile-actions"
          onClick={() => setOpenDrawer(true)}
          role="button"
        >
          <span className="mobile-cart">
            🛒 {cart.length > 0 && <b>({cart.length})</b>}
          </span>
        </div>
      </div>

      {/* =======================
         CART DRAWER (SLIDE-IN)
      ======================== */}
      <CartDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </header>
  );
}
