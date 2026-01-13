import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css"; // Nouveau style

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders/all")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Erreur chargement commandes:", err));
  }, []);

  const statusColor = {
    Pending: "pending",
    Confirmed: "confirmed",
    Shipped: "shipped",
    Delivered: "delivered",
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">
        📦 Orders
      </h1>

      <div className="orders-table">
        <div className="orders-header">
          <span>Client</span>
          <span>Adresse</span>
          <span>Produits</span>
          <span>Total</span>
          <span>Status</span>
          <span>Date</span>
        </div>

        {orders.map((order) => (
          <div className="orders-row" key={order._id}>
            
            {/* CLIENT */}
            <div className="orders-cell">
              <strong>{order.nom} {order.prenom}</strong>
              <p>{order.email}</p>
              <p>{order.telephone}</p>
            </div>

            {/* ADRESSE */}
            <div className="orders-cell">
              {order.adresse}, {order.delegation}, {order.gouvernorat}, Tunisie
            </div>

            {/* PRODUITS */}
            <div className="orders-cell">
              {order.cart.map((p, i) => (
                <div key={i} className="product-line">
                  <span>{p.nom}</span>
                  <span className="product-details"> — {p.taille} × {p.quantite}</span>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="orders-cell total">
              {order.total} TND
            </div>

            {/* STATUS */}
            <div className="orders-cell">
              <span className={`status-badge ${statusColor[order.status]}`}>
                {order.status}
              </span>
            </div>

            {/* DATE */}
            <div className="orders-cell">
              {new Date(order.createdAt).toLocaleString("fr-FR")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
