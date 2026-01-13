const Collection = require('../models/collection');
const Produit = require('../models/Produit');

// Créer une collection
exports.createCollection = async (req, res) => {
  try {
    const { nom, description } = req.body;
    const image = req.file ? `/uploads/collections/${req.file.filename}` : '';
    const collection = new Collection({ nom, description, image });
    await collection.save();
    res.status(201).json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la création de la collection', err });
  }
};

// Récupérer toutes les collections avec nombre de produits
exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    const result = await Promise.all(
      collections.map(async col => {
        const produits = await Produit.find({ collection: col._id });
        return { ...col.toObject(), produitsCount: produits.length };
      })
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des collections', err });
  }
};

// Récupérer une collection par ID
exports.getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: 'Collection introuvable' });
    res.json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération de la collection', err });
  }
};

// Mettre à jour une collection
exports.updateCollection = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = `/uploads/collections/${req.file.filename}`;
    const collection = await Collection.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!collection) return res.status(404).json({ message: 'Collection introuvable' });
    res.json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour', err });
  }
};

// Supprimer une collection
exports.deleteCollection = async (req, res) => {
  try {
    await Collection.findByIdAndDelete(req.params.id);
    res.json({ message: 'Collection supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la suppression', err });
  }
};

// Récupérer tous les produits d’une collection
exports.getProduitsByCollection = async (req, res) => {
  try {
    const produits = await Produit.find({ collection: req.params.id });
    res.json(produits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', err });
  }
};
