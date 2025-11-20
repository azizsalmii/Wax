import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // ⚡ Slides : change juste les chemins d’images + textes si besoin
  const slides = [
    {
      leftImg: "/assets/left2.jpg",
      rightImg: "/assets/right2.jpg",
      titleLines: ["TRACK", "THE", "WAX"],
      subtitle: "Authetic Clothing Wear"
    },
    {
      leftImg: "/assets/left.jpg",
      rightImg: "/assets/right.jpg",
      titleLines: ["LIVE", "LOVE", "WAX"],
      subtitle: "Authetic Clothing Wear"
    },
    {
      leftImg: "/assets/left3.jpg",
      rightImg: "/assets/right3.jpg",
      titleLines: ["LIVE", "IN", "WAX"],
      subtitle: "Authetic Clothing Wear"
    }
  ];

  // ⏱️ Changement de slide toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="nevermind-hero-v2">
      <div className="hero-container">
        <div className="hero-slides">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            >
              {/* Photo gauche */}
              <div className="hero-image left">
                <img src={slide.leftImg} alt="Hero left" />
              </div>

              {/* Photo droite */}
              <div className="hero-image right">
                <img src={slide.rightImg} alt="Hero right" />
              </div>

              {/* Texte centré */}
              <div className="hero-content">
                <h1>
                  {slide.titleLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h1>
                <p>{slide.subtitle}</p>
                <button
                  className="shop-now-btn"
                  onClick={() => navigate("/catalog")}
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
