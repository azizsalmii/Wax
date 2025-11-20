Client (site public) — structure proposée

But: dossier pour l'application cliente (catalogue, panier, checkout, profil).

Structure suggérée:
- `src/`
  - `pages/` (Home, ProductPage, Cart, Checkout, Profile)
  - `components/` (ProductCard, Header, Footer, CartSummary)
  - `services/` (api.js — appels vers backend)
  - `App.jsx` / `main.jsx`
- `public/` (assets statiques)

Intégration avec le backend:
- `GET /api/produits` — lister produits
- `GET /api/produits/:id` — détails
- `POST /api/panier/:userId/add` — ajouter au panier
- `POST /api/commandes` — créer commande

Démarrage rapide (si vous utilisez Vite):
- `npm create vite@latest . -- --template react`
- `npm install`
- `npm run dev`

Remarque: Votre workspace contient déjà un frontend à la racine (`src/`). Vous pouvez déplacer/refactorer ce contenu dans `frontend/client` si vous préférez séparer les apps.
