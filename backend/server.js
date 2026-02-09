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

// ✅ CORS (autoriser Vite + backoffice + etc.)
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// fallback dev (si CORS_ORIGINS vide)
const devOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Postman / curl n’envoient pas d’Origin => on autorise
      if (!origin) return callback(null, true);

      const ok =
        allowedOrigins.includes(origin) ||
        devOrigins.includes(origin);

      if (ok) return callback(null, true);

      console.log('❌ CORS blocked origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.options('*', cors());

// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.json({ message: 'Wax backend is running' }));

app.use('/api/produits', produitsRouter);
app.use('/api/panier', panierRouter);
app.use('/api/reclamations', reclamationRouter);
app.use('/api/feedbacks', feedbackRouter);
app.use('/api/collections', collectionRouter);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/waxdb';

async function startServer() {
  app.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));
}

async function connectWithRetry(retries = 0) {
  try {
    await mongoose.connect(MONGO_URI, { keepAlive: true });
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error(`❌ MongoDB connection failed (attempt ${retries + 1}/5):`, err.message);
    if (retries < 5) {
      setTimeout(() => connectWithRetry(retries + 1), 2000);
    } else {
      console.warn('❌ Could not connect to MongoDB after several attempts.');
    }
  }
}

startServer().then(() => connectWithRetry());

// basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});
