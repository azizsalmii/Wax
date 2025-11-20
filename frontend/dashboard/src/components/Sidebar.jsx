import React from 'react'
import { NavLink } from 'react-router-dom'

const linkStyle = ({ isActive }) => ({
  display: 'block',
  padding: '10px 12px',
  color: isActive ? '#fff' : '#5b2b00',
  background: isActive ? '#b24a00' : 'transparent',
  borderRadius: 6,
  textDecoration: 'none',
  marginBottom: 6
})

export default function Sidebar(){
  return (
    <div className="sidebar">
      <nav>
        <ul style={{listStyle:'none',padding:0}}>
          <li><NavLink to="/" style={linkStyle}>Accueil</NavLink></li>
          <li><NavLink to="/produits" style={linkStyle}>Produits</NavLink></li>
          <li><NavLink to="/commandes" style={linkStyle}>Commandes</NavLink></li>
          <li><NavLink to="/reclamations" style={linkStyle}>Réclamations</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}
