const Feedback = require("../models/Feedback");

// Ajouter un feedback (admin)
exports.addFeedback = async (req, res) => {
  try {
    const { name, message } = req.body;
    let imagePath = "";

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    // isVisible = true par défaut (dans le modèle)
    const feedback = new Feedback({ name, message, image: imagePath });

    await feedback.save();

    res.status(201).json({ message: "Feedback ajouté avec succès", feedback });
  } catch (error) {
    console.error("Erreur addFeedback:", error);
    res.status(500).json({ message: "Erreur lors de l'ajout du feedback", error });
  }
};

// Récupérer tous les feedbacks (admin)
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Erreur getAllFeedbacks:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des feedbacks", error });
  }
};

// Récupérer les feedbacks visibles (public)
exports.getVisibleFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ isVisible: true }).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Erreur getVisibleFeedbacks:", error);
    res.status(500).json({ message: "Erreur lors de la récupération", error });
  }
};

// Modifier visibilité (admin)
exports.toggleVisibility = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback introuvable" });
    }

    feedback.isVisible = !feedback.isVisible;
    await feedback.save();

    res.status(200).json({
      message: "Visibilité mise à jour",
      isVisible: feedback.isVisible
    });
  } catch (error) {
    console.error("Erreur toggleVisibility:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la visibilité", error });
  }
};

// Supprimer un feedback (admin)
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: "Feedback supprimé avec succès" });
  } catch (error) {
    console.error("Erreur deleteFeedback:", error);
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};