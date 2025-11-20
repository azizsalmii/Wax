import React, { useEffect, useState } from "react";
import "./Preloader.css";

export default function Preloader() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Temps d'affichage du loader (2 à 3 secondes)
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
      <img src="/assets/Logo_wax.png" alt="Loading..." className="preloader-logo" />
    </div>
  );
}
