import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Wax Clothing</h2>
      </div>

      <nav className="sidebar-nav">

        <NavLink 
          to="/" 
          end 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Dashboard
        </NavLink>

        <NavLink 
          to="/produits" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Produits
        </NavLink>

        {/* 🔥 Nouvelle route CRUD Collections */}
        <NavLink 
          to="/collections" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Collections
        </NavLink>

        {/* (Optionnel) Tu peux garder l'ancienne page pr les détails si tu veux */}
        {/* <NavLink to="/collection" className={({ isActive }) => (isActive ? 'active' : '')}>
          Collections (Ancienne)
        </NavLink> */}

        <NavLink 
          to="/commandes" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Commandes
        </NavLink>

        <NavLink 
          to="/feedbacks" 
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Feedback
        </NavLink>

      </nav>
    </div>
  );
}
