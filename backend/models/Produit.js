const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  prix: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  categorie: { type: String, enum: ['pantalon', 'pull', 'eventail', 'autre'], default: 'autre' },
  images: [{ type: String }],
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Produit', ProduitSchema);
