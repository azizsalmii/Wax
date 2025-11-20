const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reclamationController');

router.post('/', ctrl.createReclamation);
router.get('/', ctrl.getReclamations);
router.get('/:id', ctrl.getReclamationById);
router.put('/:id', ctrl.updateReclamation);

module.exports = router;
