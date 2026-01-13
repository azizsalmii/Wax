import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Collection.css";

export default function Collection() {
  const [collections, setCollections] = useState([]);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCollections = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/collections");
      setCollections(res.data);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la récupération des collections !");
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleAddCollection = async (e) => {
    e.preventDefault();
    if (!nom || !description || !image) return alert("Tous les champs sont requis !");
    setLoading(true);

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/collections", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNom("");
      setDescription("");
      setImage(null);
      fetchCollections();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de la collection !");
    }

    setLoading(false);
  };

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

      <form className="add-collection-form" onSubmit={handleAddCollection}>
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
        <button type="submit" disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter Collection"}
        </button>
      </form>

      <div className="collection-grid">
        {collections.map((col) => (
          <div key={col._id} className="collection-card-horizontal">
            <div className="collection-image-wrapper">
              <img
                src={col.image ? `http://localhost:5000${col.image}` : "/assets/default.png"}
                alt={col.nom}
              />
            </div>
            <div className="collection-info-horizontal">
              <h3>{col.nom}</h3>
              <p>{col.description}</p>
              <p className="products-count">Produits: {col.produitsCount || 0}</p>
              <div className="collection-actions">
                <button className="edit-btn">Modifier</button>
                <button className="delete-btn" onClick={() => handleDelete(col._id)}>
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
