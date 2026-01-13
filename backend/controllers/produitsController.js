const Produit = require("../models/Produit");
const Collection = require("../models/collection");

// ====================
// CREATE PRODUIT (MULTI IMAGES)
// ====================
exports.createProduit = async (req, res) => {
  try {
    const {
      nom,
      description,
      prix,
      stock,
      categorie,
      taille,
      collectionId,
      length,
      width,
      bestSeller
    } = req.body;

    console.log("BODY createProduit:", req.body);
    console.log("FILES createProduit:", req.files);

    // ----------------------------
    // 1️⃣ Récupérer les images
    // ----------------------------
    let imagesPaths = [];
    if (req.files && req.files.length > 0) {
      imagesPaths = req.files.map((f) => `/uploads/${f.filename}`);
    }

    const image = imagesPaths[0] || "";

    // ----------------------------
    // 2️⃣ Vérifier la collection
    // ----------------------------
    if (collectionId) {
      const found = await Collection.findById(collectionId);
      if (!found) {
        return res.status(400).json({ error: "Collection introuvable" });
      }
    }

    // ----------------------------
    // 3️⃣ Créer le produit
    // ----------------------------
    const produit = new Produit({
      nom,
      description,
      prix,
      stock,
      categorie,
      taille,
      images: imagesPaths,
      image,
      collection: collectionId || null,
      bestSeller: bestSeller === "true" || bestSeller === true,
      length: length || 0,
      width: width || 0,

      available: true // 🔥 produit disponible par défaut
    });

    await produit.save();

    // ----------------------------
    // 4️⃣ Lier à la collection
    // ----------------------------
    if (collectionId) {
      await Collection.findByIdAndUpdate(collectionId, {
        $push: { produits: produit._id },
      });
    }

    res.status(201).json(produit);
  } catch (err) {
    console.error("Erreur createProduit:", err);
    res.status(400).json({ error: err.message });
  }
};

// ====================
// GET ALL PRODUCTS
// ====================
exports.getProduits = async (req, res) => {
  try {
    const produits = await Produit.find().populate("collection");
    res.json(produits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================
// GET PRODUCT BY ID
// ====================
exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id).populate("collection");
    if (!produit) return res.status(404).json({ error: "Produit introuvable" });
    res.json(produit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================
// UPDATE PRODUIT
// ====================
exports.updateProduit = async (req, res) => {
  try {
    const {
      nom,
      description,
      prix,
      stock,
      categorie,
      taille,
      collectionId,
      length,
      width,
      bestSeller,
      available // 🔥 récupère soldout/available
    } = req.body;

    console.log("BODY updateProduit:", req.body);
    console.log("FILES updateProduit:", req.files);

    const update = {
      nom,
      description,
      prix,
      stock,
      categorie,
      taille,
      length,
      width,
      bestSeller: bestSeller === "true" || bestSeller === true,
      available: available === "true" || available === true // 🔥 mise à jour
    };

    // Vérifier collection
    if (collectionId) {
      const exists = await Collection.findById(collectionId);
      if (!exists) {
        return res.status(400).json({ error: "Collection introuvable" });
      }
      update.collection = collectionId;
    }

    // Images mises à jour ?
    if (req.files && req.files.length > 0) {
      const imagesPaths = req.files.map((f) => `/uploads/${f.filename}`);
      update.images = imagesPaths;
      update.image = imagesPaths[0];
    }

    const produit = await Produit.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!produit) return res.status(404).json({ error: "Produit introuvable" });

    res.json(produit);
  } catch (err) {
    console.error("Erreur updateProduit:", err);
    res.status(400).json({ error: err.message });
  }
};

// ====================
// DELETE PRODUIT
// ====================
exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) return res.status(404).json({ error: "Produit introuvable" });

    if (produit.collection) {
      await Collection.findByIdAndUpdate(produit.collection, {
        $pull: { produits: produit._id }
      });
    }

    res.json({ message: "Produit supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================
// GET PRODUCTS BY COLLECTION
// ====================
exports.getProduitsByCollection = async (req, res) => {
  try {
    const produits = await Produit.find({
      collection: req.params.collectionId
    }).populate("collection");

    res.json(produits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================
// SET BEST SELLER
// ====================
exports.setBestSeller = async (req, res) => {
  try {
    const { bestSeller } = req.body;

    const produit = await Produit.findByIdAndUpdate(
      req.params.id,
      { bestSeller },
      { new: true }
    );

    if (!produit) return res.status(404).json({ error: "Produit introuvable" });

    res.json(produit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================
// GET ALL BEST SELLERS
// ====================
exports.getBestSellers = async (req, res) => {
  try {
    const produits = await Produit.find({ bestSeller: true }).populate("collection");
    res.json(produits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
