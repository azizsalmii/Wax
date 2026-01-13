// src/pages/ProductPage.jsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProductPage.css";

const API_BASE = "http://localhost:5000";

export default function ProductPage() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inView, setInView] = useState(false);

  // Onglets visuels
  const [activeTab, setActiveTab] = useState("all"); // all | best | sale

  // Filtres sidebar
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCollection, setFilterCollection] = useState("all");
  const [filterCategorie, setFilterCategorie] = useState("all");
  const [filterTaille, setFilterTaille] = useState("all");
// Pour lire les paramètres dans l'URL
const location = useLocation();

// Si l’URL contient ?categorie=xxx → appliquer automatiquement
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const cat = params.get("categorie");

  if (cat) {
    setFilterCategorie(cat);
  }
}, [location.search]);

  // ====== LOAD PRODUITS ======
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/produits`);
        setProduits(res.data || []);
      } catch (err) {
        console.error("Erreur récupération produits :", err);
        setProduits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  // ====== SCROLL REVEAL ======
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

  // ====== OPTIONS DYNAMIQUES POUR LES FILTRES ======
  const collectionOptions = useMemo(() => {
    const set = new Set();
    produits.forEach((p) => {
      if (p.collection?.nom) set.add(p.collection.nom);
    });
    return Array.from(set);
  }, [produits]);

  const categorieOptions = useMemo(() => {
    const set = new Set();
    produits.forEach((p) => {
      if (p.categorie) set.add(p.categorie);
    });
    return Array.from(set);
  }, [produits]);

  const taillesOptions = ["XS", "S", "M", "L", "XL"];

  // ====== TRI + FILTRES ======
  const produitsAffiches = useMemo(() => {
    let list = [...produits].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Onglet "Best Sellers"
    if (activeTab === "best") {
      list = list.filter((p) => p.bestSeller === true);
    }

    // Recherche
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter((p) => {
        const txt = `${p.nom || ""} ${p.description || ""} ${
          p.categorie || ""
        }`.toLowerCase();
        return txt.includes(q);
      });
    }

    // Filtre Collection
    if (filterCollection !== "all") {
      list = list.filter((p) => p.collection?.nom === filterCollection);
    }

    // Filtre Type / Catégorie
    if (filterCategorie !== "all") {
      list = list.filter((p) => p.categorie === filterCategorie);
    }

    // Filtre Taille
    if (filterTaille !== "all") {
      list = list.filter((p) => p.taille === filterTaille);
    }

    return list;
  }, [
    produits,
    activeTab,
    searchTerm,
    filterCollection,
    filterCategorie,
    filterTaille,
  ]);

  return (
    
    <section
      ref={sectionRef}
      className={`prod-section ${inView ? "in-view" : ""}`}
    >
      {/* ================== HERO VIDEO ================== */}
      <div className="prod-hero">
        {/* ⚠️ change le src si ton chemin est différent */}
        <video
          className="prod-hero-video"
          src="/assets/wax-products-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="prod-hero-overlay">
          <div className="prod-hero-text">
            <span className="prod-kicker">COLLECTION WAX</span>
            <h2 className="prod-hero-title">WAX PRODUTS</h2>
            <p className="prod-hero-subtitle">
              Explore our wax pieces – each card mirrors the ‘Best Sellers’ style,
               with real information from your store.
            </p>

            {/* Onglets dans le hero */}
            <div className="prod-tabs">
              <button
                className={`prod-tab ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All products
              </button>
              <button
                className={`prod-tab ${activeTab === "best" ? "active" : ""}`}
                onClick={() => setActiveTab("best")}
              >
                Best Sellers
              </button>
              
            </div>
          </div>
        </div>
      </div>

      {/* ================== CONTENU ================== */}
      <div className="prod-inner">
        <div className="prod-layout">
          {/* ===== SIDEBAR / FILTERS ===== */}
          <aside className="prod-filters">
            {/* Recherche */}
            <div className="filter-group">
              <div className="filter-label-row">
                <span className="filter-label">Search</span>
              </div>
              <div className="filter-search">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Collection */}
            <div className="filter-group">
              <div className="filter-label-row">
                <span className="filter-label">Collection</span>
              </div>
              <div className="filter-pills">
                <button
                  type="button"
                  className={`filter-pill ${
                    filterCollection === "all" ? "active" : ""
                  }`}
                  onClick={() => setFilterCollection("all")}
                >
                  Toutes
                </button>
                {collectionOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`filter-pill ${
                      filterCollection === c ? "active" : ""
                    }`}
                    onClick={() => setFilterCollection(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Type / Catégorie */}
            <div className="filter-group">
              <div className="filter-label-row">
                <span className="filter-label">Type</span>
              </div>
              <div className="filter-pills">
                <button
                  type="button"
                  className={`filter-pill ${
                    filterCategorie === "all" ? "active" : ""
                  }`}
                  onClick={() => setFilterCategorie("all")}
                >
                  Tous
                </button>
                {categorieOptions.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-pill ${
                      filterCategorie === cat ? "active" : ""
                    }`}
                    onClick={() => setFilterCategorie(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Taille */}
            <div className="filter-group">
              <div className="filter-label-row">
                <span className="filter-label">Size</span>
              </div>
              <div className="filter-pills">
                <button
                  type="button"
                  className={`filter-pill ${
                    filterTaille === "all" ? "active" : ""
                  }`}
                  onClick={() => setFilterTaille("all")}
                >
                  Toutes
                </button>
                {taillesOptions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`filter-pill ${
                      filterTaille === t ? "active" : ""
                    }`}
                    onClick={() => setFilterTaille(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ===== CONTENU PRINCIPAL ===== */}
          <div className="prod-main">
            {loading ? (
              <div className="prod-state">Chargement des produits…</div>
            ) : produitsAffiches.length === 0 ? (
              <div className="prod-state">
                Aucun produit ne correspond à ces filtres.
              </div>
            ) : (
              <div className="prod-grid">
                {produitsAffiches.map((p, index) => {
                  const img = p.image
                    ? `${API_BASE}${p.image}`
                    : "/assets/default.png";

                  const oldPrice =
                    typeof p.prix === "number"
                      ? `${Math.round(p.prix * 1.2)} TND`
                      : null;

                  const price =
                    p.prix != null ? `${p.prix} TND` : "Prix non renseigné";


                  return (
                    <article
  key={p._id}
  className={`prod-card card-${index + 1}`}
  onClick={() => navigate(`/produit/${p._id}`)}
>
  {/* IMAGE + BADGE DISPONIBILITÉ */}
  <div
    className="prod-image"
    style={{ backgroundImage: `url(${img})` }}
  >
    <span
      className={`badge-soft ${
        p.available ? "available" : "soldout"
      } prod-badge-luxe`}
    >
      {p.available ? "Available" : "Sold Out"}
    </span>
  </div>

  {/* CONTENU */}
  <div className="prod-content">
    <div className="prod-title-row">
      <h3 className="prod-title">{p.nom}</h3>
    </div>

    <div className="prod-price-row">
      <span className="prod-price">{price}</span>
      {oldPrice && <span className="prod-old-price">{oldPrice}</span>}
    </div>

    <div className="prod-meta-row">
      <span className="prod-meta">
        {p.categorie || "Catégorie inconnue"} • {p.taille || "Taille unique"}
      </span>

      <button
        className="prod-cta"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/produit/${p._id}`);
        }}
      >
        View Product
      </button>
    </div>
  </div>
</article>


                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
