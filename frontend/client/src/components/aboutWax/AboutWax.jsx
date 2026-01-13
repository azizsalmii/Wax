// src/components/aboutWax/AboutWax.jsx
import React, { useEffect, useRef, useState } from "react";
import "./AboutWax.css";
import { useNavigate } from "react-router-dom";

export default function AboutWax() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Reveal on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`aboutwax ${inView ? "in-view" : ""}`}>

      {/* ======================= HERO BACKGROUND ======================= */}
      <div
        className="aboutwax-hero-bg"
        style={{ backgroundImage: "url('/assets/about-hero.jpg')" }} // 🔁 mets ton image ici
      >
        <div className="aboutwax-hero-overlay" />

        <div className="aboutwax-hero">
          <p className="aboutwax-hero-kicker">ABOUT WAX</p>

          <h1 className="aboutwax-hero-title">
            African heritage reinvented <br /> in modern pieces.
          </h1>

          <div className="aboutwax-hero-line" />
        </div>
      </div>

      {/* ======================= MAIN CONTENT ======================= */}
      <div className="aboutwax-inner">

        {/* LEFT TEXT */}
        <div className="aboutwax-left">
          <h2>About Wax...</h2>

          <p>
            Wax is the meeting point between modern style and African heritage.
            We create unique pants, sweaters, and fans from wax fabric,
            known for its vibrant colors and iconic patterns.
          </p>

          <p>
            Each piece is designed to offer originality, quality, and identity.
            With Wax, fashion becomes a way to express who you are while celebrating
            African culture.
          </p>

          <button className="aboutwax-btn" onClick={() => navigate("/apropos")}>
            LEARN MORE
          </button>
        </div>

        {/* RIGHT MOSAIC */}
        <div className="aboutwax-right">
          <div className="mosaic">
            <img src="/assets/about1.jpg" alt="wax look 1" className="mosaic-img img1" />
            <img src="/assets/about2.jpg" alt="wax look 2" className="mosaic-img img2" />
            <img src="/assets/about3.jpg" alt="wax look 3" className="mosaic-img img3" />
          </div>
        </div>

      </div>
    </section>
  );
}
