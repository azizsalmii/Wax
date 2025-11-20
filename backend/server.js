const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const produitsRouter = require('./routes/produits');
const panierRouter = require('./routes/panier');
const commandeRouter = require('./routes/commande');
const reclamationRouter = require('./routes/reclamation');

const app = express();
app.use(express.json());
app.use(cors());

// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.json({ message: 'Wax backend is running' }));

app.use('/api/produits', produitsRouter);
app.use('/api/panier', panierRouter);
app.use('/api/commandes', commandeRouter);
app.use('/api/reclamations', reclamationRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/waxdb';

let dbConnected = false;

async function startServer() {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

async function connectWithRetry(retries = 0) {
  try {
    await mongoose.connect(MONGO_URI, { keepAlive: true });
    dbConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    dbConnected = false;
    console.error(`Failed to connect to MongoDB (attempt ${retries + 1}):`, err.message);
    if (retries < 5) {
      // wait 2s then retry
      setTimeout(() => connectWithRetry(retries + 1), 2000);
    } else {
      console.warn('Could not connect to MongoDB after several attempts. Starting server in degraded mode.');
    }
  }
}

// Start server regardless of DB state to avoid crashing in development.
startServer().then(() => connectWithRetry());

// basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});
