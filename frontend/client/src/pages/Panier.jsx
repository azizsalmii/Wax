// src/pages/Panier.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";

export default function Panier() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calcul du total
  const total = cart.reduce((sum, item) => sum + item.prix * item.quantite, 0);

  return (
    <div className="cart-page">
      <h1 className="cart-title">Votre Panier</h1>

      {/* Panier vide */}
      {cart.length === 0 && (
        <p className="cart-empty">Votre panier est vide.</p>
      )}

      <div className="cart-list">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            
            <img src={item.image} alt={item.nom} />

            <div className="cart-info">
              <div className="cart-name">{item.nom}</div>
              <div className="cart-sub">Taille : {item.taille}</div>
              <div className="cart-qty">Quantité : {item.quantite}</div>
              <div className="cart-price">{item.prix} TND</div>
            </div>

            <button
              className="cart-remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <>
          <div className="cart-total">
            Total : <span>{total} TND</span>
          </div>

          <button className="cart-checkout-btn">
            Procéder au paiement
          </button>
        </>
      )}
    </div>
  );
}
