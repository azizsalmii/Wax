// models/Collection.js
const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, unique: true }, // nom de la collection
    description: { type: String },                        // optionnel
    image: { type: String },                               // image de la collection
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", CollectionSchema);
