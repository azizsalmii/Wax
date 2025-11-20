const Reclamation = require('../models/Reclamation');

exports.createReclamation = async (req, res) => {
  try {
    // Only accept contact and message from client form
    const { contact, message, commande } = req.body;
    const rec = new Reclamation({ contact, message, commande });
    await rec.save();
    res.status(201).json(rec);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReclamations = async (req, res) => {
  try {
    const recs = await Reclamation.find().populate('commande');
    res.json(recs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReclamation = async (req, res) => {
  try {
    const rec = await Reclamation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(rec);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReclamationById = async (req, res) => {
  try {
    const rec = await Reclamation.findById(req.params.id).populate('commande');
    if (!rec) return res.status(404).json({ error: 'Reclamation introuvable' });
    res.json(rec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
