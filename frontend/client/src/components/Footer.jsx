import React, { useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO : brancher ton backend / Mailchimp plus tard
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="wax-footer">
      <div className="footer-inner">
        {/* ===== LIGNE 1 : MARQUE + NEWSLETTER + RÉSEAUX ===== */}
        <div className="footer-row footer-row-top">
          {/* Marque */}
          <div className="footer-brand u-fade u-delay-1">
            <div className="footer-logo">WAX</div>
            <p className="footer-desc">
              Authentic African fabrics &amp; garments
            </p>
          </div>

          {/* Newsletter au centre */}
          <div className="footer-newsletter u-fade u-delay-2">
            <p className="newsletter-title">
              Stay updated on new drops
            </p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Your e-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (submitted) setSubmitted(false);
                }}
              />
              <button type="submit">S&apos;Sign Up</button>
            </form>
            {submitted && (
              <p className="newsletter-success">
                Thank you ✨ You’ll be notified about upcoming collections.
              </p>
            )}
          </div>

          {/* Réseaux sociaux à droite */}
          <div className="footer-social u-fade u-delay-3">
            <span className="footer-social-label">Follow WAX</span>
            <div className="footer-social-icons">
              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/waxclothing.tn/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram WAX"
                className="social-icon instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="3.2"
                    y="3.2"
                    width="17.6"
                    height="17.6"
                    rx="5"
                    ry="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4.3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                </svg>
              </a>

              {/* TIKTOK */}
              <a
                href="https://www.tiktok.com/@waxclothing.tn"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok WAX"
                className="social-icon tiktok"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M15 4.5c.6 1.1 1.6 2 2.9 2.4v3.1a5.9 5.9 0 0 1-3-1v4.5a4.7 4.7 0 1 1-4.3-4.7v3.1a1.8 1.8 0 1 0 1.4 1.7V4.5h3z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              {/* FACEBOOK (placeholder) */}
              <a
                href="#"
                aria-label="Facebook"
                className="social-icon facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M14.5 8H16V5h-1.5C11.9 5 10 6.9 10 9.5V11H8v3h2v5h3v-5h2.2l.8-3H13v-1.5c0-.9.6-1.5 1.5-1.5z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ===== LIGNE 2 : COPYRIGHT + CONTACT CENTRÉS ===== */}
        <div className="footer-bottom-center u-fade u-delay-4">
          <p>contact@wax.example</p>
          <p>© {new Date().getFullYear()} WAX — All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
