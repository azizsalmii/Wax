import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../../components/productForm/ProductForm.jsx";
import "./Product.css";
import { API_ORIGIN } from "../services/apiOrigin";


const API_BASE_URL = `${API_ORIGIN}/api`;
const SERVER_BASE_URL = `${API_ORIGIN}`;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Charger tous les produits
  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/produits`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Erreur chargement produits:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Charger toutes les collections
  const loadCollections = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/collections`);
      setCollections(res.data || []);
    } catch (err) {
      console.error("Erreur chargement collections:", err);
      setCollections([]);
    }
  };

  useEffect(() => {
    loadCollections();
    loadProducts();
  }, []);

  // Créer un produit
  const handleCreate = async (payload) => {
    try {
      await axios.post(`${API_BASE_URL}/produits`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowForm(false);
      setEditing(null);
      await loadProducts();
    } catch (err) {
      console.error(err);
      alert("Erreur création produit.");
    }
  };

  // Mettre à jour un produit
  const handleUpdate = async (id, payload) => {
    try {
      await axios.put(`${API_BASE_URL}/produits/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditing(null);
      setShowForm(false);
      await loadProducts();
    } catch (err) {
      console.error(err);
      alert("Erreur mise à jour produit.");
    }
  };

  // Supprimer un produit
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/produits/${id}`);
      await loadProducts();
    } catch (err) {
      console.error(err);
      alert("Erreur suppression produit.");
    }
  };

  return (
    <div className="products-page">
      <div className="header">
        <h1>🛒 Gestion des Produits</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm((v) => !v);
          }}
        >
          ➕ Ajouter un produit
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <ProductForm
            initial={editing}
            collections={collections}
            onSubmit={
              editing
                ? (payload) => handleUpdate(editing._id, payload)
                : handleCreate
            }
          />
          {editing && (
            <button
              className="btn-cancel"
              onClick={() => {
                setEditing(null);
                setShowForm(false);
              }}
            >
              Annuler
            </button>
          )}
        </div>
      )}

      {/* TABLE PRODUITS */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Collection</th>
              <th>Catégorie</th>
              <th>Taille</th>
              <th>Length</th>
              <th>Width</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Best Seller</th>
              <th>Disponibilité</th> {/* 🟢 Nouveau champ */}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={12} className="center">
                  ⏳ Chargement...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={12} className="center">
                  Aucun produit trouvé
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const collection = collections.find(
                  (c) =>
                    String(c._id) ===
                    String(p.collection?._id || p.collection)
                );

                const imageUrl = p.image
                  ? `${SERVER_BASE_URL}${p.image}`
                  : "/logo.svg";

                return (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={imageUrl}
                        alt={p.nom}
                        onError={(e) => (e.currentTarget.src = "/logo.svg")}
                      />
                    </td>

                    <td>{p.nom}</td>
                    <td>{collection ? collection.nom : "Non défini"}</td>
                    <td>{p.categorie}</td>
                    <td>{p.taille}</td>

                    <td>{p.length ? `${p.length} m` : "—"}</td>
                    <td>{p.width ? `${p.width} m` : "—"}</td>

                    <td>{p.prix} TND</td>
                    <td>{p.stock}</td>

                    <td>{p.bestSeller ? "✔️ Oui" : "❌ Non"}</td>

                    {/* 🟢 Disponibilité */}
                    <td>
                      {p.available ? (
                        <span className="badge badge-green">Available</span>
                      ) : (
                        <span className="badge badge-red">Sold Out</span>
                      )}
                    </td>

                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => {
                          setEditing(p);
                          setShowForm(true);
                        }}
                      >
                        ✎
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(p._id)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
