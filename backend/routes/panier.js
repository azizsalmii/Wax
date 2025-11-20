const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/panierController');

router.get('/:userId', ctrl.getPanier);
router.post('/:userId/add', ctrl.addItem);
router.post('/:userId/remove', ctrl.removeItem);
router.delete('/:userId', ctrl.clearPanier);

module.exports = router;
