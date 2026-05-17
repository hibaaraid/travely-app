# Projet de Fin de Module : Application Travely

Ce dépôt contient le code source de notre projet de développement web baptisé **Travely**, réalisé en binôme dans le cadre de notre formation à l'ENSA El Jadida. 

Il s'agit d'une plateforme de gestion et de réservation de voyages de type blog touristique, construite autour d'une architecture découplée (Front-end en React et Back-end sous forme d'API REST avec Laravel).

---

## Ce que fait l'application

L'application est configurée pour gérer deux types d'accès selon le profil de l'utilisateur :

* **Espace Client (User) :** Une fois connecté, un utilisateur peut parcourir le catalogue des destinations, lire des articles de blog complets et détaillés (conseils de voyage pour Marrakech, Istanbul, etc.), faire une réservation ou envoyer un message via le formulaire de contact. Il a également accès à un espace "Mes Réservations" pour suivre et annuler ses demandes.
* **Espace Administrateur (Admin) :** L'administrateur dispose des droits d'écriture et de modification (CRUD) pour ajouter de nouvelles destinations, publier ou éditer des articles sur le blog et suivre l'ensemble des réservations de la plateforme.

---

## Outils et technologies

* **Front-end :** Bibliothèque ReactJS (utilisation de hooks fonctionnels et de React Router DOM pour la navigation). Le design a été entièrement personnalisé en CSS pour correspondre à une charte graphique moderne (thème bleu marine profond et rouge écarlate).
* **Back-end :** Framework Laravel pour la création de l'API RESTful. La sécurité et la protection des routes selon les rôles sont gérées via des jetons d'authentification avec Laravel Sanctum.
* **Base de données :** Base de données MySQL (les tables `users`, `destinations`, `reservations` et `blogs` sont liées par des clés étrangères pour assurer l'intégrité des données).

---

## Guide d'installation et de lancement rapide

### Prérequis
Avoir installé **Node.js**, **Composer** et un serveur local (**XAMPP**) avec MySQL activé.

Pour déployer et tester le projet sur votre machine, suivez simplement ces deux étapes dans vos terminaux :

### ÉTAPE 1 : Configuration et lancement du Back-end (Laravel)
Ouvrez un **premier terminal** à la racine du projet (`travely-app`) et exécutez la suite de commandes suivante :
```bash
# 1. Entrer dans le dossier du serveur
cd travely-backend

# 2. Télécharger les dépendances PHP (crée le dossier vendor)
composer install

# 3. Créer le fichier de configuration local
cp .env.example .env

# 4. Générer la clé de sécurité unique de l'application
php artisan key:generate

# 5. Créer automatiquement les tables dans votre base de données MySQL
php artisan migrate

# 6. Créer le lien symbolique indispensable pour l'affichage des images
php artisan storage:link

# 7. Démarrer le serveur API Laravel
php artisan serve

### ÉTAPE 2 :Configuration et lancement du Front-end (React) . Ouvrez un second terminal à la racine du projet (travely-app) et exécutez cette suite de commandes :

# 1. Entrer dans le dossier de l'application cliente
cd Travely

# 2. Télécharger les modules Node nécessaires (crée le dossier node_modules)
npm install

# 3. Démarrer l'application React
npm start
