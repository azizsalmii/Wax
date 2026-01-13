// src/components/trackBanner/TrackBanner.jsx
import React from "react";
import "./TrackBanner.css";

export default function TrackBanner() {
  const items = ["TRACK THE WAX", "TRACK THE WAX", "TRACK THE WAX", "TRACK THE WAX"];

  return (
    <section className="track-banner">
      <div className="track-banner-inner">
        <div className="track-banner-track">
          {/* 1er bloc */}
          {items.map((txt, i) => (
            <div key={`block-1-${i}`} className="track-banner-item">
              <span className="track-banner-text">{txt}</span>
              <img
                src="/assets/Logo_wax_white.png"
                alt="Wax Logo"
                className="track-banner-logo"
              />
            </div>
          ))}

          {/* 2ème bloc (duplication pour scroll infini sans trou) */}
          {items.map((txt, i) => (
            <div key={`block-2-${i}`} className="track-banner-item">
              <span className="track-banner-text">{txt}</span>
              <img
                src="/assets/Logo_wax_white.png"
                alt="Wax Logo"
                className="track-banner-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
