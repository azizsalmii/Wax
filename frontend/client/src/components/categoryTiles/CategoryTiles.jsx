import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryTiles.css";

export default function CategoryTiles() {
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const items = [
    { key: "pantalon", label: "Pantalons", img: "/assets/_DSC2010-Edit.jpg" },
    { key: "pull", label: "Pulls", img: "/assets/DSC02027.JPG" },
    { key: "eventail", label: "Éventails", img: "/assets/eventail.JPG" },
  ];

  // Scroll reveal : active l’animation quand la section entre dans le viewport
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
      className={`category-section ${inView ? "in-view" : ""}`}
    >
      <div className="category-section-inner">
        {/* Titre de section */}
        <div className="category-section-header">
          <span className="category-kicker">CATEGORIES</span>
          <h2>SHOP BY CATEGORY</h2>
          <p>Choisis ta vibe et plonge dans la collection.</p>
        </div>

        {/* Grille de catégories */}
        <div className="category-tiles-modern">
          {items.map((it, index) => (
            <button
              key={it.key}
              className={`category-tile-modern tile-${index + 1}`}
              onClick={() =>
                navigate(`/produits?categorie=${encodeURIComponent(it.key)}`)
              }
              aria-label={`Voir les ${it.label}`}
            >
              <div
                className="tile-media-modern"
                style={{ backgroundImage: `url(${it.img})` }}
              />
              <div className="tile-gradient-overlay" />
              <div className="tile-overlay">
                <div className="tile-title-modern">
                  {it.label.toUpperCase()}
                </div>
                <div className="tile-sub-modern">VOIR LA CATÉGORIE</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
