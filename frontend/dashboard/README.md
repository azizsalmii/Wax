Dashboard (admin) — structure proposée

But: dossier pour l'interface d'administration (gestion produits, commandes, réclamations).

Structure suggérée:
- `src/`
  - `pages/` (ProductsList, ProductEdit, Orders, Reclamations, DashboardHome)
  - `components/` (DataTable, FormProduct, Topbar, Sidebar)
  - `services/` (api.js — appels vers `/api/...` du backend)
  - `App.jsx` / `main.jsx`
- `package.json` (ou utiliser le monorepo racine)

Notes:
- L'admin peut être une app React séparée (create-react-app / Vite) ou une partie protégée du frontend principal.
- Authentification admin nécessaire en prod.
- Exemples d'API:
  - `GET /api/produits`
  - `POST /api/produits`
  - `GET /api/commandes`
  - `GET /api/reclamations`

Pour démarrer rapidement (Vite + React):
- `npm create vite@latest . -- --template react`
- `npm install`
- `npm run dev`
