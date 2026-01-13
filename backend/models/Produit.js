// models/Produit.js
const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  prix: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  taille: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], default: 'M' },

  categorie: { type: String, enum: ['pantalon', 'pull', 'eventail', 'autre'], default: 'autre' },
  images: [{ type: String }],
  image: { type: String },
  collection: { type: mongoose.Schema.Types.ObjectId, ref: "Collection", required: true },

  bestSeller: { type: Boolean, default: false },

  // ➕ Nouveau champ
  available: { type: Boolean, default: true }, // true = en stock, false = sold out

  length: { type: Number, default: 0 },
  width: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Produit', ProduitSchema);
