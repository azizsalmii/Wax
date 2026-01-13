import React, { useState } from "react";
import "./CartDrawer.css";
import { useCart } from "../context/CartContext";
import ModalCheckout from "./ModalCheckout";

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!open) return null;

  // -------------------------------------------------------------
  // 📨 Envoi email + validation de commande
  // -------------------------------------------------------------
  const handleCheckoutSubmit = async (formValues) => {
    try {
     await fetch("http://localhost:5000/api/orders/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formValues,
          cart,
          total,
        }),
      });

      // ❌ on SUPPRIME le alert ici
      // alert("Commande envoyée avec succès !");

      clearCart();
      setCheckoutOpen(false);
      onClose();

    } catch (err) {
      console.error("Erreur : ", err);

      // ❌ on supprime aussi l’alerte d’erreur
      // alert("Erreur lors de l’envoi de la commande.");
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>

          {/* HEADER */}
          <div className="cart-header">
            <h2>Votre Panier</h2>
            <button className="close-btn" onClick={onClose}>
              ✖
            </button>
          </div>

          {/* LISTE DES PRODUITS */}
          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">Votre panier est vide 🖤</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="cart-card">
                  <img src={item.image} alt="" className="cart-img" />

                  <div className="cart-info">
                    <h3>{item.nom}</h3>
                    <p>Taille : {item.taille}</p>
                    <p>Quantité : {item.quantite}</p>
                    <p className="price">{item.prix} TND</p>

                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      Supprimer
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
                <span>Total :</span>
                <strong>{total} TND</strong>
              </div>

              <button
                className="checkout-btn"
                onClick={() => setCheckoutOpen(true)}
              >
                Passer la commande
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
