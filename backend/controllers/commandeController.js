const Commande = require("../models/Commande");
const Produit = require("../models/Produit");

// =============================================
// 1) CRÉER COMMANDE
// =============================================
exports.createCommande = async (req, res) => {
  try {
    const { produit, taille, quantite } = req.body;

    if (!produit || !taille || !quantite) {
      return res.status(400).json({ message: "Champs manquants." });
    }

    const newCommande = await Commande.create({
      produit,
      taille,
      quantite,
      statut: "en_attente",
      createdAt: new Date(),
    });

    const populated = await newCommande.populate("produit");

    res.status(201).json(populated);
  } catch (err) {
    console.error("Erreur createCommande :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// =============================================
// 2) GET TOUTES LES COMMANDES
// =============================================
exports.getCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find().populate("produit");
    res.json(commandes);
  } catch (err) {
    console.error("Erreur getCommandes :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// =============================================
// 3) GET UNE COMMANDE PAR ID
// =============================================
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id).populate("produit");

    if (!commande) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.json(commande);
  } catch (err) {
    console.error("Erreur getCommandeById :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// =============================================
// 4) UPDATE STATUT
// =============================================
exports.updateStatut = async (req, res) => {
  try {
    const { statut } = req.body;

    const commande = await Commande.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true }
    ).populate("produit");

    if (!commande) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.json({
      message: "Statut mis à jour",
      commande,
    });
  } catch (err) {
    console.error("Erreur updateStatut :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// =============================================
// 5) UPDATE QUANTITÉ
// =============================================
exports.updateQuantite = async (req, res) => {
  try {
    const { quantite } = req.body;

    if (!quantite || quantite < 1) {
      return res.status(400).json({ message: "Quantité invalide" });
    }

    const commande = await Commande.findByIdAndUpdate(
      req.params.id,
      { quantite },
      { new: true }
    ).populate("produit");

    if (!commande) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.json({
      message: "Quantité mise à jour",
      commande,
    });
  } catch (err) {
    console.error("Erreur updateQuantite :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// =============================================
// 6) SUPPRIMER COMMANDE
// =============================================
exports.deleteCommande = async (req, res) => {
  try {
    const deleted = await Commande.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.json({ message: "Commande supprimée" });
  } catch (err) {
    console.error("Erreur deleteCommande :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
