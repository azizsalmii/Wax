import React, { useState, useEffect } from "react";
import "./ProductForm.css";

export default function ProductForm({ onSubmit, initial, collections }) {
  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix: 0,
    stock: 0,
    categorie: "pantalon",
    taille: "M",
    length: 0,
    width: 0,
    bestSeller: false,
    available: true,
    collectionId: "",
  });

  const [files, setFiles] = useState([]);

  // 🔥 Précharger le produit lors de l'édition
  useEffect(() => {
    if (initial) {
      setForm({
        nom: initial.nom || "",
        description: initial.description || "",
        prix: initial.prix || 0,
        stock: initial.stock || 0,
        categorie: initial.categorie || "pantalon",
        taille: initial.taille || "M",
        length: initial.length || 0,
        width: initial.width || 0,
        bestSeller: initial.bestSeller || false,
        available: initial.available ?? true,
        collectionId: initial.collection?._id || "",
      });
      setFiles([]);
    }
  }, [initial]);

  // 🔥 Gère tous les changements dans les inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔥 Gère les images multiples
  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected]);
  };

  // 🔥 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.collectionId) {
      alert("Veuillez sélectionner une collection !");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));

    files.forEach((f) => {
      fd.append("images", f);
    });

    onSubmit(fd);
  };

  // 🔥 Reset du formulaire
  const handleReset = () => {
    setForm({
      nom: "",
      description: "",
      prix: 0,
      stock: 0,
      categorie: "pantalon",
      taille: "M",
      length: 0,
      width: 0,
      bestSeller: false,
      available: true,
      collectionId: "",
    });
    setFiles([]);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form-container">

      {/* 🔥 Ligne des 2 checkboxes : Produit disponible + Best Seller */}
      <div
        className="form-row"
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "center",
          marginBottom: "-5px",
        }}
      >
        {/* Produit disponible */}
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
            />
            Produit disponible
          </label>
        </div>

        {/* Best Seller uniquement en mode édition */}
        {initial && (
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="bestSeller"
                checked={form.bestSeller}
                onChange={handleChange}
              />
              Best Seller
            </label>
          </div>
        )}
      </div>

      {/* Nom + Collection */}
      <div className="form-row">
        <div className="form-group">
          <label>Nom du produit</label>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Collection</label>
          <select
            name="collectionId"
            value={form.collectionId}
            onChange={handleChange}
            required
          >
            <option value="">Choisir collection</option>
            {collections?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.nom}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Catégorie + Taille */}
      <div className="form-row">
        <div className="form-group">
          <label>Catégorie</label>
          <select
            name="categorie"
            value={form.categorie}
            onChange={handleChange}
          >
            <option value="pantalon">Pantalon</option>
            <option value="pull">Pull</option>
            <option value="eventail">Éventail</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className="form-group">
          <label>Taille</label>
          <select
            name="taille"
            value={form.taille}
            onChange={handleChange}
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
      </div>

      {/* Prix + Stock */}
      <div className="form-row">
        <div className="form-group">
          <label>Prix (TND)</label>
          <input
            type="number"
            name="prix"
            value={form.prix}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Length + Width */}
      <div className="form-row">
        <div className="form-group">
          <label>Length</label>
          <input
            type="number"
            name="length"
            value={form.length}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Width</label>
          <input
            type="number"
            name="width"
            value={form.width}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Upload Images */}
      <div className="form-row">
        <div className="form-group">
          <label>Images (jusqu'à 5)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            name="images"
            onChange={handleFiles}
          />

          {files.length > 0 && (
            <div className="preview-row">
              {files.map((f, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(f)}
                  alt={`preview-${i}`}
                  className="preview-img"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="form-row">
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="btn-container">
        <button type="submit" className="btn-submit">
          Enregistrer
        </button>
        <button type="button" className="btn-reset" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>
    </form>
  );
}
