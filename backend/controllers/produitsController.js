const Produit = require('../models/Produit');

exports.createProduit = async (req, res) => {
  try {
    // allow explicit mapping to avoid unexpected fields
    const { nom, description, prix, stock, categorie, images, image: imageUrl } = req.body;
    // if a file was uploaded by multer, prefer that file URL
    let image = imageUrl;
    if (req.file && req.file.filename) {
      image = `/uploads/${req.file.filename}`;
    }
    const produit = new Produit({ nom, description, prix, stock, categorie, images, image });
    await produit.save();
    res.status(201).json(produit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) return res.status(404).json({ error: 'Produit introuvable' });
    res.json(produit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduit = async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file && req.file.filename) {
      update.image = `/uploads/${req.file.filename}`;
    }
    const produit = await Produit.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!produit) return res.status(404).json({ error: 'Produit introuvable' });
    res.json(produit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) return res.status(404).json({ error: 'Produit introuvable' });
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
