import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">

      {/* TITLE BACKGLOW */}
      <div className="contact-background-title">CONTACT</div>

      <div className="contact-wrapper">

        {/* LEFT SIDE */}
        <div className="contact-left">
          <button className="contact-pill">Contact</button>

          <h2 className="contact-title">Get in touch</h2>
          <p className="contact-subtitle">
            Need help or have a question? Our team is here to assist you promptly.
          </p>

          {/* INFO CARDS */}
          <div className="contact-info">

            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <div>
                <p className="card-title">Email</p>
                <p className="card-text">contact@waxstore.com</p>
              </div>
              <div className="arrow">➜</div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <div>
                <p className="card-title">Téléphone</p>
                <p className="card-text">+216 22 000 111</p>
              </div>
              <div className="arrow">➜</div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <div>
                <p className="card-title">Localisation</p>
                <p className="card-text">Tunis, Tunisie</p>
              </div>
              <div className="arrow">➜</div>
            </div>

          </div>
        </div>

        {/* RIGHT FORM */}
        <form className="contact-form">
          <input className="input-field" type="text" placeholder="Nom" />
          <input className="input-field" type="email" placeholder="Email" />
          <textarea className="input-field textarea" placeholder="Message"></textarea>

          <button className="submit-btn">Envoyer</button>
        </form>

      </div>
    </div>
  );
}
