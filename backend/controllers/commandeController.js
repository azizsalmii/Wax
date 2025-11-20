const Commande = require('../models/Commande');
const Panier = require('../models/Panier');

exports.createCommande = async (req, res) => {
  try {
    const { userId, adresseLivraison, paymentInfo } = req.body;
    // For simplicity, take cart items and create order
    const panier = await Panier.findOne({ userId }).populate('items.produit');
    if (!panier || panier.items.length === 0) return res.status(400).json({ error: 'Panier vide' });

    const items = panier.items.map(it => ({ produit: it.produit._id, quantite: it.quantite, prixUnitaire: it.produit.prix }));
    const totalPrix = items.reduce((s, i) => s + i.prixUnitaire * i.quantite, 0);

    const commande = new Commande({ userId, items, totalPrix, adresseLivraison, paymentInfo, statut: 'pending' });
    await commande.save();

    // clear panier
    await Panier.findOneAndDelete({ userId });

    res.status(201).json(commande);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find().populate('items.produit');
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id).populate('items.produit');
    if (!commande) return res.status(404).json({ error: 'Commande introuvable' });
    res.json(commande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatut = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndUpdate(req.params.id, { statut: req.body.statut }, { new: true });
    res.json(commande);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
