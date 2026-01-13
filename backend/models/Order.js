const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    nom: String,
    prenom: String,
    email: String,
    telephone: String,
    gouvernorat: String,
    delegation: String,
    adresse: String,

    cart: [
      {
        nom: String,
        prix: Number,
        taille: String,
        quantite: Number,
        image: String,
      }
    ],

    total: Number,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
