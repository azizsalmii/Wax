const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/commandeController');

router.post('/', ctrl.createCommande);
router.get('/', ctrl.getCommandes);
router.get('/:id', ctrl.getCommandeById);
router.patch('/:id/statut', ctrl.updateStatut);

module.exports = router;
