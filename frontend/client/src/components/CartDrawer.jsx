import React, { useState } from "react";
import "./CartDrawer.css";
import { useCart } from "../context/CartContext";
import ModalCheckout from "./ModalCheckout";
import { API_ORIGIN } from "../services/apiOrigin";

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!open) return null;

  // -------------------------------------------------------------
  // 📨 Envoi email + validation de commande
  // -------------------------------------------------------------
  const handleCheckoutSubmit = async (formValues) => {
    try {
      await fetch(`${API_ORIGIN}/api/orders/send-order-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formValues,
          cart,
          total,
        }),
      });

      clearCart();
      setCheckoutOpen(false);
      onClose();
    } catch (err) {
      console.error("Erreur : ", err);
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
          {/* HEADER */}
          <div className="cart-header">
            <div className="cart-title-wrap">
              <h2 className="cart-title">Cart</h2>
              <span className="cart-subtitle">
                {cart.length > 0 ? `${cart.length} item(s)` : "Your cart is empty"}
              </span>
            </div>

            <button className="close-btn" onClick={onClose} aria-label="Close cart">
              ✖
            </button>
          </div>

          {/* LISTE DES PRODUITS */}
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon" aria-hidden="true">
                  {/* petit icon panier (SVG) */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6.5 9h14l-1.2 10.2a2 2 0 0 1-2 1.8H8.7a2 2 0 0 1-2-1.8L5.5 4.8A1.8 1.8 0 0 0 3.7 3.2H2.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 11v-2a3 3 0 0 1 6 0v2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h3>Your cart is empty</h3>
                <p>Add items to your cart to place an order.</p>

                <button className="empty-cta" onClick={onClose}>
                  Continue shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="cart-card">
                  <img src={item.image} alt={item.nom} className="cart-img" />

                  <div className="cart-info">
                    <div className="cart-row-top">
                      <h3 className="cart-item-title">{item.nom}</h3>
                      <span className="cart-item-price">{item.prix} TND</span>
                    </div>

                    <div className="cart-meta">
                      <span>Size: <b>{item.taille}</b></span>
                      <span>Qty: <b>{item.quantite}</b></span>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER */}
          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="total-row">
                <span>Total</span>
                <strong>{total} TND</strong>
              </div>

              <button className="checkout-btn" onClick={() => setCheckoutOpen(true)}>
                Place your order
              </button>
            </div>
          )}
        </div>
      </div>

      {/* POPUP CHECKOUT */}
      <ModalCheckout
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handleCheckoutSubmit}
      />
    </>
  );
}
