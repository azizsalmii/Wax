// src/pages/ProductDetail.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import LuxeToast from "../components/LuxeToast";
import { useCart } from "../context/CartContext";

const API_BASE = "http://localhost:5000";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [showToast, setShowToast] = useState(false);
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState("");

  const taillesDisponibles = ["XS", "S", "M", "L", "XL"];

  // GUIDE DES TAILLES
  const sizeChart = {
    XS: { width: 44, length: 64 },
    S: { width: 48, length: 67 },
    M: { width: 52, length: 70 },
    L: { width: 56, length: 73 },
    XL: { width: 60, length: 76 },
  };
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // 🔹 Chargement produit
  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/produits/${id}`);
        setProduit(res.data);

        setSelectedSize(
          taillesDisponibles.includes(res.data?.taille)
            ? res.data.taille
            : "M"
        );
      } catch (err) {
        console.error(err);
        setError("Impossible de charger ce produit.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduit();
  }, [id]);

  // 🔹 Images produit
  const images = useMemo(() => {
    if (!produit) return ["/assets/default.png"];

    const raw = [];
    if (produit.image) raw.push(produit.image);
    (produit.images || []).forEach((img) => raw.push(img));

    const urls = [...new Set(raw.filter(Boolean))].map((img) =>
      img.startsWith("http") ? img : `${API_BASE}${img}`
    );

    if (!urls.length) urls.push("/assets/default.png");

    while (urls.length < 3) urls.push(urls[urls.length - 1]);

    return urls;
  }, [produit]);

  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => setActiveImage(0), [images.length, id]);

  // 🔹 AJOUT AU PANIER (CORRIGÉ)
  const handleOrder = () => {
    if (!produit) return;

    setError("");

    if (!selectedSize) return setError("Merci de choisir une taille.");
    if (qty < 1) return setError("La quantité doit être au moins 1.");

    addToCart({
      id: produit._id,
      nom: produit.nom,
      image: images[0],
      prix: produit.prix,
      taille: selectedSize,
      quantite: qty,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  // 🔹 Loading
  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="center-message">Chargement du produit...</div>
      </div>
    );
  }

  if (!produit) {
    return (
      <div className="product-detail-page">
        <div className="center-message">
          Produit introuvable. 
          <button onClick={() => navigate(-1)}>Retour</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">

      {/* TOAST */}
      {showToast && (
        <LuxeToast
          message="Ajouté au panier avec succès ! 🖤"
          onClose={() => setShowToast(false)}
        />
      )}

      <main className="product-detail-layout">

        {/* 🖼 IMAGES */}
        <section className="product-gallery">
          <div className="main-photo">
            <img src={images[activeImage]} alt={produit.nom} />
          </div>

          <div className="thumb-row">
            {images.map((src, idx) => (
              <button
                key={idx}
                className={`thumb ${idx === activeImage ? "active" : ""}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </section>

        {/* 📝 DETAILS */}
        <aside className="product-panel">
          <div className="panel-inner">
            <h1 className="panel-title">{produit.nom}</h1>

            <p className="panel-subtitle">
              {produit.categorie} • Collection {produit.collection?.nom}
            </p>

            <div className="panel-price-row">
              <span className="panel-price">{produit.prix} TND</span>
              <span className="panel-old-price">
                {(produit.prix * 1.2).toFixed(0)} TND
              </span>
            </div>

            <p className="panel-description">{produit.description}</p>

            {/* 🔹 TAILLES */}
            <div className="panel-block">
              <span className="panel-label">Size</span>

              <div className="size-row">
                {taillesDisponibles.map((t) => (
                  <button
                    key={t}
                    className={`size-pill ${selectedSize === t ? "active" : ""}`}
                    onClick={() => setSelectedSize(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="size-guide-toggle">
                <button
                  className="size-guide-btn"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                >
                  Size Guide
                </button>
              </div>

              {/* 🔹 SIZE GUIDE TABLE */}
              {showSizeGuide && (
                <div className="size-table fade-in-scale">
                  <h3 className="table-title">Size Guide</h3>

                  <table>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Width</th>
                        <th>Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(sizeChart).map((t) => (
                        <tr key={t}>
                          <td>{t}</td>
                          <td>{sizeChart[t].width} cm</td>
                          <td>{sizeChart[t].length} cm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* 🔹 QUANTITÉ */}
            <div className="panel-block">
              <span className="panel-label">Quantité</span>
              <div className="qty-row">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>

            {/* 🔹 AJOUT AU PANIER */}
            <div className="panel-actions">
              <button className="btn-primary" onClick={handleOrder}>
                Ajouter au panier
              </button>
            </div>

            {error && <div className="panel-message error">{error}</div>}
          </div>
        </aside>
      </main>
    </div>
  );
}
