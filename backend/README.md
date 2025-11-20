Wax backend — instructions rapides

Prerequis:
- Node.js (16+ recommended)
- MongoDB (local or cloud URI)

Installation

PowerShell (depuis `c:\Users\MSI\wax\backend`):

```powershell
npm install
copy .env.example .env
# puis éditer .env pour définir MONGO_URI si besoin
npm run dev
```

Le serveur écoute par défaut sur `http://localhost:5000`.

Endpoints principaux (exemples PowerShell `Invoke-RestMethod`)

Produits
- Créer un produit:
```powershell
$body = @{ nom = 'Pantalon Wax'; description='Beau pantalon'; prix=29.99; stock=10; categorie='pantalon' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:5000/api/produits' -Method Post -Body $body -ContentType 'application/json'
```
- Lister:
```powershell
Invoke-RestMethod -Uri 'http://localhost:5000/api/produits' -Method Get
```
- Récupérer par id:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/produits/<id>" -Method Get
```
- Mettre à jour:
```powershell
$body = @{ prix = 24.99 } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/produits/<id>" -Method Put -Body $body -ContentType 'application/json'
```
- Supprimer:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/produits/<id>" -Method Delete
```

Panier
- Récupérer panier d'un user (userId en string):
```powershell
Invoke-RestMethod -Uri 'http://localhost:5000/api/panier/user123' -Method Get
```
- Ajouter un item:
```powershell
$body = @{ produitId = '<produitId>'; quantite = 2 } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:5000/api/panier/user123/add' -Method Post -Body $body -ContentType 'application/json'
```
- Retirer un item:
```powershell
$body = @{ produitId = '<produitId>' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:5000/api/panier/user123/remove' -Method Post -Body $body -ContentType 'application/json'
```

Commandes
- Créer une commande depuis le panier:
```powershell
$body = @{ userId='user123'; adresseLivraison='Rue Exemple'; paymentInfo = @{ method='card' } } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:5000/api/commandes' -Method Post -Body $body -ContentType 'application/json'
```
- Lister commandes:
```powershell
Invoke-RestMethod -Uri 'http://localhost:5000/api/commandes' -Method Get
```

Réclamations
- Créer:
```powershell
$body = @{ userId='user123'; sujet='Produit défectueux'; message='Le tissu est abîmé'; commande = '<commandeId>' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:5000/api/reclamations' -Method Post -Body $body -ContentType 'application/json'
```

Remarques
- Assurez-vous d'avoir MongoDB disponible et que `MONGO_URI` pointe vers une base valide.
- Ces routes sont basiques; pour la prod il faut ajouter authentification, validations, et tests.
