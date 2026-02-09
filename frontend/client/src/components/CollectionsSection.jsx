import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CollectionsSection.css";
import { API_ORIGIN } from "../services/apiOrigin";

const API_BASE = `${API_ORIGIN}`;

export default function CollectionsSection() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/collections`);
        setCollections(res.data);
      } catch (err) {
        console.error("Erreur fetch collections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: 40 }}>
        Loading collections...
      </div>
    );
  }

  return (
    <section className="collections-section">
      <p className="collections-kicker">COLLECTIONS</p>
      <h2 className="collections-title">SHOP BY COLLECTION</h2>
      <p className="collections-sub">
        Select a collection and explore the vibe.
      </p>

      <div className="collections-row">
        {collections.map((col) => (
          <div key={col._id} className="collection-circle-card">

            <div className="collection-circle-img">
              <img
                src={col.image ? `${API_BASE}${col.image}` : "/assets/default.png"}
                alt={col.nom}
              />
              <span className="collection-circle-name">{col.nom}</span>
            </div>

            <Link 
              to={`/collection?id=${col._id}`}
              className="collection-circle-btn"
            >
              {col.nom} ↗
            </Link>

          </div>
        ))}
      </div>
    </section>
  );
}
