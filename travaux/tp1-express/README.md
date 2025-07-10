# API de gestion des locaux et équipements

## Description
Cette API RESTful permet de gérer des **locaux** (salles, laboratoires, bureaux) et les **équipements** qui leur sont associés (ordinateurs, projecteurs, etc.). Elle est développée avec **Node.js** et **Express**, et utilise des tableaux en mémoire pour stocker les données.

## Fonctionnalités

### Gestion des locaux
- `GET /api/locaux` : Récupérer tous les locaux
- `GET /api/locaux/:id` : Récupérer un local par son ID
- `POST /api/locaux` : Créer un nouveau local
- `PUT /api/locaux/:id` : Modifier un local existant
- `DELETE /api/locaux/:id` : Supprimer un local
- `GET /api/locaux/:id/equipements` : Lister les équipements d’un local

### Gestion des équipements
- `GET /api/equipements` : Récupérer tous les équipements
- `GET /api/equipements/:id` : Récupérer un équipement par son ID
- `POST /api/equipements` : Ajouter un équipement
- `PUT /api/equipements/:id` : Modifier un équipement
- `DELETE /api/equipements/:id` : Supprimer un équipement
- `PUT /api/equipements/:id/assigner/:localId` : Associer un équipement à un local

## Validation
Un middleware de validation vérifie la présence et la validité des champs requis lors des requêtes POST et PUT.

## Installation et lancement

1. Installer les dépendances :

```bash
npm install
```

2. Lancer le serveur:
```bash
npm run start
```

Le serveur sera accessible sur http://localhost:3000.

### Structure du projet

```sh
api/
│
├── controllers/      # Logique métier des routes
├── models/           # Données simulées en mémoire
├── routes/           # Définition des routes Express
├── middlewares/      # Validation des données
├── [index.js](http://_vscodecontentref_/0)          # Point d’entrée de l’application
└── [README.md](http://_vscodecontentref_/1)         # Ce fichier
```

### Tests
Une collection Postman est disponible dans le dossier `postman/` pour tester les différentes routes de l’API.
