import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css";
import { API_ORIGIN } from "../services/apiOrigin";

const API_BASE_URL = `${API_ORIGIN}`;

/* ============================
   COMPONENT : STAT COUNTER
============================ */
function StatItem({ icon, value, suffix = "", label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200; 
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="stat-item">
      <span className="stat-icon">{icon}</span>
      <span className="stat-number">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Charger les feedbacks visibles depuis le backend
  const loadFeedbacks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/feedbacks/visible`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Erreur fetch feedbacks:", err);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (feedbacks.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setStartIndex((prev) => (prev + 1) % feedbacks.length);
        setFade(true);
      }, 350);
    }, 2800);

    return () => clearInterval(interval);
  }, [feedbacks]);

  const visible = [
    feedbacks[startIndex],
    feedbacks[(startIndex + 1) % feedbacks.length],
    feedbacks[(startIndex + 2) % feedbacks.length],
  ].filter(Boolean);

  return (
    <div className="feedback-page">

      {/* ⭐ BANDEAU STATISTIQUES */}
      {/* ⭐ BANDEAU STATISTIQUES AVEC VIDÉO */}
<div className="stats-banner video-version">

  {/* Vidéo subtile */}
  <video className="stats-video" autoPlay loop muted playsInline>
    <source src="/assets/wax-stats-bg.mp4" type="video/mp4" />
  </video>

  {/* Overlay sombre */}
  <div className="stats-video-overlay"></div>

  <StatItem icon="✔" value={350} label="delivered orders" />
  <StatItem icon="✔" value={98} suffix="%" label="Customer satisfaction" />
  <StatItem icon="✔" value={12} label="Countries delivered" />
</div>

      <h1 className="feedback-title">Customer Reviews</h1>

      <div className={`feedback-carousel ${fade ? "fade-in" : "fade-out"}`}>
        {visible.map((fb, i) => (
          <div className="feedback-card" key={i}>
            
            {/* ---- BACKGROUND FIXE ---- */}
            <div
              className="feedback-bg"
              style={{
                backgroundImage: "url(/assets/fb-bg1.jpg)"
              }}
            ></div>

            <div className="feedback-overlay"></div>

            {/* ---- AVATAR ---- */}
            {fb.image && (
              <img
                src={`${API_BASE_URL}${fb.image}`}
                className="feedback-avatar"
                alt={fb.name}
              />
            )}

            <div className="feedback-stars">★★★★★</div>

            <p className="fb-text">“{fb.message}”</p>
            <p className="fb-name">{fb.name}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
