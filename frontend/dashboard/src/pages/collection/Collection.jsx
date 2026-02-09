import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Collection.css";
import { API_ORIGIN } from "../services/apiOrigin";


export default function Collection() {
  const [collections, setCollections] = useState([]);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // 🔹 Récupérer les collections
  const fetchCollections = async () => {
    try {
      const res = await axios.get(`${API_ORIGIN}/api/collections`);
      setCollections(res.data);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la récupération des collections !");
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  // 🔹 Ajouter OU modifier une collection
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !description) {
      return alert("Nom et description requis !");
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingId) {
        // ✏️ UPDATE
        await axios.put(
          `http://localhost:5000/api/collections/${editingId}`,
          formData
        );
      } else {
        // ➕ CREATE
        await axios.post(
          `${API_ORIGIN}/api/collections`,
          formData
        );
      }

      // Reset formulaire
      setNom("");
      setDescription("");
      setImage(null);
      setEditingId(null);

      fetchCollections();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'opération !");
    }

    setLoading(false);
  };

  // 🔹 Supprimer
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette collection ?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/collections/${id}`);
      fetchCollections();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression !");
    }
  };

  return (
    <div className="collection-dashboard">
      <h1>Collections</h1>

      {/* 🔹 FORMULAIRE */}
      <form className="add-collection-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom de la collection"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading
              ? "Traitement..."
              : editingId
              ? "Mettre à jour la collection"
              : "Ajouter Collection"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditingId(null);
                setNom("");
                setDescription("");
                setImage(null);
              }}
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      {/* 🔹 LISTE */}
      <div className="collection-grid">
        {collections.map((col) => (
          <div key={col._id} className="collection-card-horizontal">
            <div className="collection-image-wrapper">
              <img
                src={
                  col.image
                    ? `http://localhost:5000${col.image}`
                    : "/assets/default.png"
                }
                alt={col.nom}
              />
            </div>

            <div className="collection-info-horizontal">
              <h3>{col.nom}</h3>
              <p>{col.description}</p>
              <p className="products-count">
                Produits : {col.produitsCount || 0}
              </p>

              <div className="collection-actions">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditingId(col._id);
                    setNom(col.nom);
                    setDescription(col.description);
                    setImage(null);
                  }}
                >
                  Modifier
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(col._id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
