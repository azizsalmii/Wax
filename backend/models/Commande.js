const mongoose = require('mongoose');

const CommandeItemSchema = new mongoose.Schema({
  produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
  quantite: { type: Number, required: true },
  prixUnitaire: { type: Number, required: true }
});

const CommandeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [CommandeItemSchema],
  totalPrix: { type: Number, required: true },
  statut: { type: String, enum: ['pending','paid','shipped','delivered','cancelled'], default: 'pending' },
  adresseLivraison: { type: String },
  paymentInfo: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commande', CommandeSchema);
