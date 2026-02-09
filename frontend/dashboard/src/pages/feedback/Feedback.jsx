import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Feedback.css";
import { API_ORIGIN } from "../services/apiOrigin";


const API_BASE_URL = `${API_ORIGIN}/api`;

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", message: "", image: null });
  const [editing, setEditing] = useState(null);
  const [file, setFile] = useState(null);

  const loadFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/feedbacks`);
      const data = res.data.map(fb => ({ ...fb, isVisible: !!fb.isVisible }));
      setFeedbacks(data);
    } catch (err) {
      console.error("Erreur chargement feedbacks:", err);
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = e => {
    setFile(e.target.files?.[0] || null);
  };

  const resetForm = () => {
    setForm({ name: "", message: "", image: null });
    setFile(null);
    setEditing(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let data;
      if (file) {
        data = new FormData();
        data.append("name", form.name);
        data.append("message", form.message);
        data.append("image", file);
      } else {
        data = { name: form.name, message: form.message };
      }

      if (editing) {
        await axios.put(`${API_BASE_URL}/feedbacks/${editing._id}`, data, {
          headers: { "Content-Type": file ? "multipart/form-data" : "application/json" },
        });
      } else {
        await axios.post(`${API_BASE_URL}/feedbacks/add`, data, {
          headers: { "Content-Type": file ? "multipart/form-data" : "application/json" },
        });
      }

      resetForm();
      loadFeedbacks();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi du feedback");
    }
  };

  const handleDelete = async id => {
    if (!window.confirm("Supprimer ce feedback ?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/feedbacks/${id}`);
      setFeedbacks(prev => prev.filter(fb => fb._id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur suppression feedback");
    }
  };

  const startEdit = fb => {
    setEditing(fb);
    setForm({
      name: fb.name || "",
      message: fb.message || "",
      image: null,
    });
  };

  const toggleVisibility = async id => {
    try {
      await axios.patch(`${API_BASE_URL}/feedbacks/visibility/${id}`);
      setFeedbacks(prev =>
        prev.map(fb =>
          fb._id === id ? { ...fb, isVisible: !fb.isVisible } : fb
        )
      );
    } catch (err) {
      console.error(err);
      alert("Erreur modification visibilité");
    }
  };

  return (
    <div className="feedback-container">
      <h1>💬 Gestion des Feedbacks</h1>

      {/* FORMULAIRE */}
      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          required
        />
        <input type="file" accept="image/*" onChange={handleFile} />

        <div className="btn-group">
          <button type="submit">{editing ? "Modifier" : "Ajouter"}</button>
          {editing && <button type="button" onClick={resetForm}>Annuler</button>}
        </div>
      </form>

      {/* LISTE DES FEEDBACKS */}
      <div className="feedback-list">
        {loading ? (
          <p>⏳ Chargement...</p>
        ) : feedbacks.length === 0 ? (
          <p>Aucun feedback pour le moment</p>
        ) : (
          feedbacks.map(fb => (
            <div key={fb._id} className="feedback-card">
              {fb.image && (
                <img
                  src={`http://localhost:5000${fb.image}`}
                  alt={fb.name}
                />
              )}

              <div className="feedback-content">
                <h3>{fb.name}</h3>
                <p>{fb.message}</p>

                <div className="visibility-container">
                  <label className={`switch ${fb.isVisible ? "active" : ""}`}>
                    <input
                      type="checkbox"
                      checked={fb.isVisible}
                      onChange={() => toggleVisibility(fb._id)}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span>{fb.isVisible ? "Visible" : "Caché"}</span>
                </div>
              </div>

              <div className="feedback-actions">
                <button onClick={() => startEdit(fb)}>✎</button>
                <button onClick={() => handleDelete(fb._id)}>🗑</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
