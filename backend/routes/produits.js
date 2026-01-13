const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/produitsController');
const multer = require('multer');
const path = require('path');

// store uploads in backend/uploads
const uploadDir = path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-')),
});

const upload = multer({ storage });

// 🔴 IMPORTANT : on utilise array('images')
// le champ s'appelle "images" (pluriel) et accepte jusqu'à 5 fichiers
router.post('/', upload.array('images', 5), ctrl.createProduit);
router.get('/', ctrl.getProduits);
router.get('/:id', ctrl.getProduitById);
router.put('/:id', upload.array('images', 5), ctrl.updateProduit);
router.delete('/:id', ctrl.deleteProduit);

module.exports = router;
