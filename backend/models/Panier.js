const mongoose = require('mongoose');

const PanierItemSchema = new mongoose.Schema({
  produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
  quantite: { type: Number, default: 1 }
});

const PanierSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [PanierItemSchema],
  totalPrix: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Panier', PanierSchema);
