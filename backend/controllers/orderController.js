// controllers/orderController.js
const nodemailer = require("nodemailer");
const Order = require("../models/Order");

// -------------------------------------------------------------
// 📌 CREATE ORDER + SEND EMAIL
// -------------------------------------------------------------
exports.createOrder = async (req, res) => {
  const { customer, cart, total } = req.body;

  try {
    // MAIL CONFIG
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "iyedbf9@gmail.com",
        pass: "jmdqymogdtjyqcfl",
      },
    });

    // PRODUCT LIST HTML
    const itemsList = cart
      .map((item) => {
        const BASE_URL = "http://localhost:5000";
        const imageUrl = item.image.startsWith("http")
          ? item.image
          : BASE_URL + item.image;

        return `
          <tr>
            <td style="border:1px solid #ccc;padding:8px;text-align:center;">
              <img src="${imageUrl}" alt="Produit"
                style="width:70px;height:70px;border-radius:8px;object-fit:cover;" />
            </td>
            <td style="border:1px solid #ccc;padding:8px;">${item.nom}</td>
            <td style="border:1px solid #ccc;padding:8px;">${item.taille}</td>
            <td style="border:1px solid #ccc;padding:8px;">${item.quantite}</td>
            <td style="border:1px solid #ccc;padding:8px;">${item.prix} TND</td>
          </tr>
        `;
      })
      .join("");

    const html = `
      <div style="font-family:Arial, sans-serif; max-width:650px; margin:auto;">
        <h2 style="text-align:center;">Nouvelle commande – WAX Boutique</h2>

        <hr />

        <h3>Détails de la commande</h3>

        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr style="background:#f7f7f7;">
            <th style="padding:10px;border:1px solid #ccc;">Image</th>
            <th style="padding:10px;border:1px solid #ccc;">Produit</th>
            <th style="padding:10px;border:1px solid #ccc;">Taille</th>
            <th style="padding:10px;border:1px solid #ccc;">Qté</th>
            <th style="padding:10px;border:1px solid #ccc;">Prix</th>
          </tr>
          ${itemsList}
        </table>

        <h3>Résumé</h3>
        <p><strong>Total :</strong> ${total} TND</p>

        <h3>Client</h3>
        <p>
          ${customer.nom} ${customer.prenom}<br>
          Email : ${customer.email}<br>
          Tel : ${customer.telephone}
        </p>

        <h3>Adresse</h3>
        <p>${customer.adresse}, ${customer.delegation}, ${customer.gouvernorat}, Tunisie</p>
      </div>
    `;

    // SAVE TO DATABASE
    const newOrder = new Order({
      nom: customer.nom,
      prenom: customer.prenom,
      email: customer.email,
      telephone: customer.telephone,
      gouvernorat: customer.gouvernorat,
      delegation: customer.delegation,
      adresse: customer.adresse,
      cart,
      total,
    });

    await newOrder.save();

    // SEND EMAIL
    await transporter.sendMail({
      from: "WAX Boutique <iyedbf9@gmail.com>",
      to: "iyedbf9@gmail.com",
      subject: "Nouvelle commande – WAX",
      html,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Erreur createOrder:", err);
    res.status(500).json({ success: false, error: "Erreur interne" });
  }
};

// -------------------------------------------------------------
// 📌 GET ALL ORDERS
// -------------------------------------------------------------
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Erreur getAllOrders:", err);
    res.status(500).json({ error: "Impossible de charger les commandes" });
  }
};
