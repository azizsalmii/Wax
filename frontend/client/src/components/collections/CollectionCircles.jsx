import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CollectionCircles.css";

export default function CollectionCircles() {
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const collections = [
    {
      key: "Collection1",
      label: "Collection 1",
      img: "/assets/cercle1.jpg",
    },
    {
      key: "Collection2",
      label: "Collection 2",
      img: "/assets/cercle2.jpg",
    },
    {
      key: "Collection3",
      label: "Collection 3",
      img: "/assets/cercle3.jpg",
    },
    {
      key: "Collection4",
      label: "Collection 4",
      img: "/assets/cercle4.jpg",
    },
    {
      key: "Collection5",
      label: "Collection 5",
      img: "/assets/cercle5.jpg",
    },
  ];

  // Scroll reveal
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
      className={`collection-section ${inView ? "in-view" : ""}`}
    >
      <div className="collection-inner">

        {/* HEADER */}
        <div className="collection-header">
          <span className="collection-kicker">COLLECTIONS</span>
          <h2>SHOP BY COLLECTION</h2>
          <p>Sélectionne une collection et explore la vibe.</p>
        </div>

        {/* GRID DES CERCLES */}
        <div className="collection-grid">
          {collections.map((col) => (
            <button
              key={col.key}
              className="collection-card"
              onClick={() =>
                navigate(`/collection?type=${encodeURIComponent(col.key)}`)
              }
              aria-label={`Voir la collection ${col.label}`}
            >
              <div
                className="collection-circle"
                style={{ backgroundImage: `url(${col.img})` }}
              >
                <span className="collection-circle-title">
                  {col.label.toUpperCase()}
                </span>
              </div>

              <span className="collection-label">
                {col.label}
                <span className="collection-arrow">↗</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
