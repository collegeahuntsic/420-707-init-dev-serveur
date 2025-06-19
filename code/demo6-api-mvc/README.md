# API MVC Utilisateurs

Ce projet est une API RESTful en PHP utilisant une architecture MVC simplifiée pour la gestion des utilisateurs.  
Elle permet de créer, lire, mettre à jour et supprimer des utilisateurs dans une base de données MySQL.

## Fonctionnalités

- **Lister tous les utilisateurs** : `GET /users`
- **Afficher un utilisateur** : `GET /users/{id}`
- **Créer un utilisateur** : `POST /users`
- **Mettre à jour un utilisateur** : `PUT /users/{id}`
- **Supprimer un utilisateur** : `DELETE /users/{id}`

## Structure du projet

```sh
api-mvc/
│
├── config/           # Configuration
│   ├── Controller.php  ## Création des controlleurs
│   ├── Database.php    ## Connexion à la base de données
│   └── Router.php      ## Mise en place du Routeur
├── controllers/      # Contrôleurs (logique métier)
│   └── UserController.php
├── db/               # Scripts SQL (création et peuplement)
│   ├── schema.php   ## Script pour créer les tableaux
│   └── seed.php     ## Script pour initialiser les tableaux avec des données
├── models/           # Modèles (accès aux données)
│   └── User.php
├── utils/            # Fonctions utilitaires
│   ├── Helper.php
│   └── Response.php
├── index.php         # Point d'entrée principal de l'API
├── .htaccess         # Réécriture d'URL pour Apache
└── README.md
```

## Installation

1. **Copier les fichiers dans votre dossier web (ex : `htdocs` pour XAMPP).**
2. **Créer la base de données MySQL** (par défaut : `commerce_velo`).
3. **Exécuter le script de création de la table :**
   ```bash
   php db/schema.php
   ```
4. **(Optionnel) Ajouter des utilisateurs de test :**
   ```bash
   php db/seed.php
   ```
5. **Configurer le fichier `config/Database.php` si besoin (nom de la base, utilisateur, mot de passe).**
6. **Accéder à l’API via**  
   [http://localhost/api-mvc/users](http://localhost/api-mvc/users)

## Utilisation

### Endpoints disponibles

| Méthode | Endpoint          | Description                     |
| ------- | ----------------- | ------------------------------- |
| GET     | `/api/users`      | Récupérer tous les utilisateurs |
| GET     | `/api/users/{id}` | Récupérer un utilisateur par ID |
| POST    | `/api/users`      | Créer un nouvel utilisateur     |
| PUT     | `/api/users/{id}` | Mettre à jour un utilisateur    |
| DELETE  | `/api/users/{id}` | Supprimer un utilisateur        |

### Exemple de requêtes

#### `GET` tous les utilisateurs

```
GET /api-mvc/users
```

#### `GET` un utilisateur

```
  GET /api-mvc/users/1
```

#### `POST` créer un utilisateur

```
POST /api-mvc/users
Content-Type: application/json

{
"name": "Alice",
"email": "alice@example.com",
"password": "secret"
}
```

#### `PUT` mettre à jour un utilisateur

```
PUT /api-mvc/users/1
Content-Type: application/json

{
    "name": "Alice Modifié",
    "email": "alice2@example.com",
    "password": "nouveaupass"
}
```

#### `DELETE` supprimer un utilisateur

```
DELETE /api-mvc/users/1
```

