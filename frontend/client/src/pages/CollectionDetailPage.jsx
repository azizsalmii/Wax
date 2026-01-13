import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CollectionDetailPage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const API_BASE = "http://localhost:5000";

export default function CollectionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [collection, setCollection] = useState(null);
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProduits, setLoadingProduits] = useState(true);

  const [activeCategory, setActiveCategory] = useState("all");

  // --------------------------
  //  VIDÉOS STATIQUES PAR COLLECTION
  // --------------------------
  const collectionVideos = {
    "SS": "/assets/ss.mp4",
    "EEDAD": "/assets/eedad.mp4",
    "Youssef": "/assets/ypusef.mp4",
    "Summer Outfit": "/assets/summeroutfit.mp4",
    "Winter": "/assets/winter.mp4",
    "Wax Summer": "/assets/wax_summer.mp4",
    "White": "/assets/white.mp4",
    "2'nd Collection": "/assets/first.mp4",
    "1'st collection": "/assets/second.mp4",
    "3'rd collection": "/assets/third.mp4",
    "4'th Collection": "/assets/fourth.mp4",
    // 👉 ajoute ici selon les noms exacts des collections dans ta BDD
  };

  // --------------------------
  //  FETCH COLLECTION
  // --------------------------
  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/collections`);
        const found = res.data.find((c) => c._id === id) || null;
        setCollection(found);
      } catch (err) {
        console.error("Erreur fetch collection:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, [id]);

  // --------------------------
  //  FETCH PRODUITS
  // --------------------------
  useEffect(() => {
    const fetchProduits = async () => {
      if (!id) return;
      setLoadingProduits(true);
      try {
        const res = await axios.get(`${API_BASE}/api/collections/${id}/produits`);
        setProduits(res.data || []);
      } catch (err) {
        console.error("Erreur fetch produits:", err);
      } finally {
        setLoadingProduits(false);
      }
    };
    fetchProduits();
  }, [id]);

  // --------------------------
  //  FILTRE PRODUITS
  // --------------------------
  const filteredProduits = useMemo(() => {
    if (activeCategory === "all") return produits;
    return produits.filter((p) => p.categorie === activeCategory);
  }, [produits, activeCategory]);

  // --------------------------
  //  SELECT VIDEO EN FONCTION DU NOM EXACT DE LA COLLECTION
  // --------------------------
  const videoSrc = useMemo(() => {
    if (!collection?.nom) return "/assets/collection1.mp4";

    const exactName = collection.nom.trim();

    return collectionVideos[exactName] || "/assets/collection1.mp4";
  }, [collection]);

  if (!collection)
    return (
      <div className="collection-detail-page">
        <p className="cdp-loading">Collection introuvable.</p>
      </div>
    );

  return (
    <div className="collection-detail-page">
      
      {/* HERO */}
      <div className="spotlight-hero">
        <div className="spotlight-text">
          <div className="cdp-hero-kicker">WAX COLLECTION</div>
          <h1 className="spotlight-title">{collection.nom}</h1>

          {collection.description && (
            <div className="cdp-hero-desc">{collection.description}</div>
          )}
        </div>
      </div>

      {/* LAYOUT */}
      <div className="cdp-layout">

        {/* LEFT : PRODUITS */}
        <section className="cdp-products">

          {/* FILTRES */}
          <div className="cdp-filters">
            {["all", ...new Set(produits.map((p) => p.categorie))].map((cat) => (
              <button
                key={cat}
                className={`cdp-filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "all" ? "TOUS" : cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* GRID PRODUITS */}
          {loadingProduits ? (
            <p className="cdp-loading">Chargement des produits...</p>
          ) : filteredProduits.length === 0 ? (
            <p className="cdp-loading">Aucun produit dans cette catégorie.</p>
          ) : (
           <div className="cdp-grid">
  {filteredProduits.map((p, i) => (
    <article
      key={i}
      className="cdp-card"
      onClick={() => navigate(`/produit/${p._id}`)}
      style={{ cursor: "pointer" }}
    >

      {/* SLIDER IMAGE */}
      <div className="cdp-card-slider">
        <Swiper spaceBetween={10} slidesPerView={1} loop={true}>
          {p.images?.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={`${API_BASE}${img}`}
                alt={p.nom}
                className="cdp-slider-img"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* INFO + BADGE */}
      <div className="cdp-card-info">

        <div className="info-header">
          <h2>{p.nom}</h2>

          {/* 🔥 Nouveau badge luxe */}
          <div
            className={`badge-soft ${p.available ? "available" : "soldout"}`}
            onClick={(e) => e.stopPropagation()} 
          >
            {p.available ? "Available" : "Sold Out"}
          </div>
        </div>

        <div className="cdp-price">
          {p.prix ? `${p.prix} TND` : "—"}
        </div>
      </div>

    </article>
  ))}
</div>



          )}
        </section>

        {/* RIGHT : VIDEO */}
        <aside className="cdp-video-box">
          <div className="cdp-video-frame">
            <video
              key={videoSrc}
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
          <div className="cdp-video-label">
            Look & Mood — {collection.nom}
          </div>
        </aside>

      </div>
    </div>
  );
}
