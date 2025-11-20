const Panier = require('../models/Panier');
const Produit = require('../models/Produit');

exports.getPanier = async (req, res) => {
  try {
    const panier = await Panier.findOne({ userId: req.params.userId }).populate('items.produit');
    if (!panier) return res.json({ items: [] });
    res.json(panier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const { produitId, quantite = 1 } = req.body;

    let panier = await Panier.findOne({ userId });
    if (!panier) {
      panier = new Panier({ userId, items: [] });
    }

    const existing = panier.items.find(item => item.produit.toString() === produitId);
    if (existing) {
      existing.quantite += quantite;
    } else {
      panier.items.push({ produit: produitId, quantite });
    }

    // recalc totalPrix (simple approach)
    await panier.populate('items.produit');
    panier.totalPrix = panier.items.reduce((sum, it) => sum + (it.produit.prix || 0) * it.quantite, 0);
    panier.updatedAt = new Date();
    await panier.save();
    res.json(panier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const { produitId } = req.body;
    const panier = await Panier.findOne({ userId }).populate('items.produit');
    if (!panier) return res.status(404).json({ error: 'Panier introuvable' });
    panier.items = panier.items.filter(it => it.produit._id.toString() !== produitId);
    panier.totalPrix = panier.items.reduce((sum, it) => sum + (it.produit.prix || 0) * it.quantite, 0);
    await panier.save();
    res.json(panier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.clearPanier = async (req, res) => {
  try {
    const { userId } = req.params;
    const panier = await Panier.findOneAndDelete({ userId });
    res.json({ message: 'Panier vidé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
