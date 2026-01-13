const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const multer = require('multer');
const path = require('path');

// Dossier pour stocker les images de collections
const uploadDir = path.join(__dirname, '..', 'uploads', 'collections');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'))
});
const upload = multer({ storage });

// Routes CRUD
router.post('/', upload.single('image'), collectionController.createCollection);
router.get('/', collectionController.getCollections);
router.get('/:id', collectionController.getCollectionById);
router.put('/:id', upload.single('image'), collectionController.updateCollection);
router.delete('/:id', collectionController.deleteCollection);

// Récupérer tous les produits d’une collection
router.get('/:id/produits', collectionController.getProduitsByCollection);

module.exports = router;
