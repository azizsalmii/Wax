import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CollectionPage.css";

const API_BASE = "http://localhost:5000";

export default function CollectionPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const stripRef = useRef(null);
  const navigate = useNavigate();

  // 🔹 Récupérer toutes les collections
  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/collections`);
        setCollections(res.data || []);
      } catch (err) {
        console.error("Erreur fetch collections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // 🔹 Fonction pour scroller vers une carte précise
  const scrollToIndex = (index) => {
    if (!stripRef.current) return;
    const strip = stripRef.current;
    const card = strip.children[index];
    if (!card) return;

    const offset = card.offsetLeft - 24; // petit padding
    strip.scrollTo({
      left: offset,
      behavior: "smooth",
    });
  };

  // 🔹 Auto-scroll toutes les 2 secondes
  useEffect(() => {
    if (!collections.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % collections.length;
        scrollToIndex(next);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [collections]);

  // 🔹 flèches
  const handlePrev = () => {
    if (!collections.length) return;
    setActiveIndex((prev) => {
      const next = (prev - 1 + collections.length) % collections.length;
      scrollToIndex(next);
      return next;
    });
  };

  const handleNext = () => {
    if (!collections.length) return;
    setActiveIndex((prev) => {
      const next = (prev + 1) % collections.length;
      scrollToIndex(next);
      return next;
    });
  };

  // 🔹 clic sur une carte -> page détail luxe
  const handleOpenCollection = (col) => {
    navigate(`/collection/${col._id}`);
  };

  return (
    <div className="collections-page">
      {/* HERO */}
      <section className="collections-hero">
        <span className="collections-kicker">Collections</span>
        <h1 className="collections-title">SHOP BY COLLECTION</h1>
        <p className="collections-sub">
          Select a collection and explore the vibe.
        </p>
      </section>

      {/* CARROUSEL */}
      <section className="collections-strip-wrapper">
        {loading ? (
          <p className="collections-loading">Loading collections...</p>
        ) : collections.length === 0 ? (
          <p className="collections-loading">No collections available.</p>
        ) : (
          <div className="collections-strip-container">
            {/* arrows */}
            <button
              className="collections-arrow collections-arrow-left"
              onClick={handlePrev}
              aria-label="Collection précédente"
            >
              ‹
            </button>
            <button
              className="collections-arrow collections-arrow-right"
              onClick={handleNext}
              aria-label="Collection suivante"
            >
              ›
            </button>

            <div className="collections-strip" ref={stripRef}>
              {collections.map((col, index) => (
                <article
                  key={col._id}
                  className="collections-card"
                  style={{ animationDelay: `${index * 90}ms` }}
                  onClick={() => handleOpenCollection(col)}
                >
                  <div
                    className="collections-card-image"
                    style={{
                      backgroundImage: `url(${
                        col.image
                          ? `${API_BASE}${col.image}`
                          : "/assets/default.png"
                      })`,
                    }}
                  >
                    <div className="collections-card-overlay">
                      <span className="collections-pill">Collection</span>
                      <h2 className="collections-card-title">{col.nom}</h2>
                      {col.description && (
                        <p className="collections-card-text">
                          {col.description}
                        </p>
                      )}
                      <button
                        className="collections-card-btn"
                        type="button"
                      >
                        VIEW COLLECTION
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
