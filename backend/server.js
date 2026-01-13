const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const produitsRouter = require('./routes/produits');
const panierRouter = require('./routes/panier');
const reclamationRouter = require('./routes/reclamation');
const feedbackRouter = require('./routes/feedback');
const collectionRouter = require('./routes/collection');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.json({ message: 'Wax backend is running' }));

app.use('/api/produits', produitsRouter);
app.use('/api/panier', panierRouter);
app.use('/api/reclamations', reclamationRouter);
app.use('/api/feedbacks', feedbackRouter);
app.use('/api/collections', collectionRouter);

// 👉 Nouvelle route officielle pour les commandes
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/waxdb';

async function startServer() {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

async function connectWithRetry(retries = 0) {
  try {
    await mongoose.connect(MONGO_URI, { keepAlive: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(`Failed to connect (attempt ${retries + 1}):`, err.message);
    if (retries < 5) {
      setTimeout(() => connectWithRetry(retries + 1), 2000);
    } else {
      console.warn('Could not connect to MongoDB after several attempts.');
    }
  }
}

startServer().then(() => connectWithRetry());

// basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});
