const mongoose = require('mongoose');

const ReclamationSchema = new mongoose.Schema({
  // contact can be email or phone number
  contact: { type: String, required: true },
  commande: { type: mongoose.Schema.Types.ObjectId, ref: 'Commande' },
  message: { type: String, required: true },
  statut: { type: String, enum: ['open','in-progress','resolved','closed'], default: 'open' },
  reponse: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reclamation', ReclamationSchema);
