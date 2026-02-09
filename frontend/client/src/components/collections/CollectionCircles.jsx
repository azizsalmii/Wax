import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CollectionCircles.css";
import { API_ORIGIN } from "../../services/apiOrigin";

const API_BASE = `${API_ORIGIN}`;

export default function CollectionCircles() {
  const navigate = useNavigate();

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch collections depuis MongoDB
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/collections`);
        setCollections(res.data || []);
      } catch (err) {
        console.error("❌ Erreur fetch collections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section className="collection-section">
      <div className="collection-inner">

        {/* HEADER */}
        <div className="collection-header">
          <span className="collection-kicker">COLLECTIONS</span>
          <h2>SHOP BY COLLECTION</h2>
          <p>Select a collection and explore the vibe.</p>
        </div>

        {/* GRID DES CERCLES */}
        <div className="collection-grid">
          {loading ? (
            <p style={{ color: "#fff", opacity: 0.7 }}>
              Loading collections...
            </p>
          ) : collections.length === 0 ? (
            <p style={{ color: "#fff", opacity: 0.7 }}>
              No collections available.
            </p>
          ) : (
            collections.map((col) => (
              <button
                key={col._id}
                className="collection-card"
                onClick={() => navigate(`/collection/${col._id}`)}
                aria-label={`Voir la collection ${col.nom}`}
              >
                <div
                  className="collection-circle"
                  style={{
                    backgroundImage: `url(${
                      col.image ? `${API_BASE}${col.image}` : "/assets/default.png"
                    })`,
                  }}
                >
                  <span className="collection-circle-title">
                    {(col.nom || "").toUpperCase()}
                  </span>
                </div>

                <span className="collection-label">
                  {col.nom}
                  <span className="collection-arrow">↗</span>
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
