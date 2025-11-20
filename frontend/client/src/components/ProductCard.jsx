import React from 'react'
import "./ProductCard.css";
export default function ProductCard({ produit }) {
  const rawImg = produit.image || (produit.images && produit.images.length ? produit.images[0] : '/placeholder.png')
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'
  const API_ORIGIN = API_BASE.replace(/\/api\/?$/, '')
  let img = rawImg
  if (typeof rawImg === 'string') {
    if (/^https?:\/\//i.test(rawImg)) {
      img = rawImg
    } else if (rawImg.startsWith('/uploads')) {
      img = `${API_ORIGIN}${rawImg}`
    } else if (rawImg.startsWith('/')) {
      img = `${API_ORIGIN}${rawImg}`
    }
  }

  return (
    <div className="product-card">
      <div className="product-card-image" style={{ backgroundImage: `url(${img})` }} />
      <div className="product-card-body">
        <h3 className="product-card-title">{produit.nom}</h3>
        <div className="product-card-info">
          <span className="product-card-price">
            {produit.prix?.toFixed ? produit.prix.toFixed(2) + ' €' : produit.prix}
          </span>
          <span className="product-card-badge">{produit.categorie}</span>
        </div>
        <p className="product-card-desc">{produit.description?.slice(0, 100)}{produit.description?.length > 100 ? "..." : ""}</p>
        <div className="product-card-actions">
          <button className="btn-primary">Ajouter</button>
          <button className="btn-outline">Voir</button>
        </div>
      </div>
    </div>
  )
}
