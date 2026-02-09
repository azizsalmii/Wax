// src/components/bestSellers/BestSellers.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BestSellers.css";
import { API_ORIGIN } from "../../services/apiOrigin";

const API_BASE = `${API_ORIGIN}`;

export default function BestSellers() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // 🔥 Produits dynamiques
  const [products, setProducts] = useState([]);

  // -------------------------------
  // 📌 Fetch des derniers produits
  // -------------------------------
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/produits`)
      .then((res) => {
        const sorted = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // tri du plus récent
          .slice(0, 4); // prends les 4 derniers

        setProducts(sorted);
      })
      .catch((err) => console.error("Erreur chargement produits:", err));
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`best-section ${inView ? "in-view" : ""}`}
    >
      <div className="best-inner">
        {/* Header */}
        <div className="best-header">
          <span className="best-kicker">ELEVATE YOUR STYLE</span>
          <h2>See What's New Today</h2>
          <p>
            Discover the latest items added and explore the new trends.
          </p>

          <div className="best-tabs">
            <button className="best-tab active">New Arrivals</button>
          </div>
        </div>

        {/* Grille produits */}
        <div className="best-grid">
          {products.length === 0 ? (
            <p style={{ color: "white", textAlign: "center", width: "100%" }}>
              Aucun produit pour le moment.
            </p>
          ) : (
            products.map((p, index) => (
              <article
                key={p._id}
                className={`best-card card-${index + 1}`}
                onClick={() => navigate(`/produit/${p._id}`)}
              >
                <div
                  className="best-image"
                  style={{
                    backgroundImage: `url(${API_BASE}${p.images?.[0]})`,
                  }}
                >
                  <span className="best-badge">NEW</span>
                </div>

                <div className="best-content">
                  <h3 className="best-title">{p.nom}</h3>

                  <div className="best-price-row">
                    <span className="best-price">{p.prix} TND</span>
                  </div>

                  <div className="best-meta-row">
                    <span className="best-rating">★ ★ ★ ★ ☆</span>
                    <button
                      className="best-cta"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/produit/${p._id}`);
                      }}
                    >
                      Voir le produit
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
