const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const multer = require("multer");
const path = require("path");

// ======= Configuration Multer =======
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // dossier où les images seront sauvegardées
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

const upload = multer({ storage });

// ======= Routes CRUD Feedback =======

// Ajouter un feedback avec image
router.post("/add", upload.single("image"), feedbackController.addFeedback);

// Récupérer tous les feedbacks (admin)
router.get("/", feedbackController.getAllFeedbacks);

// Récupérer seulement les feedbacks visibles (public)
router.get("/visible", feedbackController.getVisibleFeedbacks);

// Modifier la visibilité d’un feedback (toggle ON/OFF)
router.patch("/visibility/:id", feedbackController.toggleVisibility);

// Supprimer un feedback
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
