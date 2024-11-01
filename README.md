JobBoard Project
Description
JobBoard est une application web conçue pour la gestion de profils utilisateurs et de candidatures à des offres d'emploi. Elle inclut une interface utilisateur créée avec React et un backend développé en Node.js. Les données sont stockées dans une base de données MySQL, gérée via MySQL Workbench pour faciliter la gestion des schémas et des données.
Table des matières
Prérequis
Installation
Configuration
Lancement du projet
Fonctionnalités
Technologies utilisées
Structure du projet
Prérequis
Node.js (version 14 ou supérieure)
MySQL (version 5.7 ou supérieure)
MySQL Workbench pour la gestion de la base de données
Git
Installation
1. Cloner le dépôt
Clonez le dépôt GitHub sur votre machine locale :
bash
Copier le code
gh repo clone EpitechMscProPromo2027/T-WEB-501-STG_14

2. Backend
Naviguez dans le répertoire backend et installez les dépendances :
cd backend
npm install

3. Base de données MySQL
Configuration avec MySQL Workbench :
Ouvrez MySQL Workbench.
Connectez-vous à votre serveur MySQL.
Créez une nouvelle base de données nommée jobboard avec la commande SQL suivante :
sql

CREATE DATABASE jobboard;


Importez les tables et les données en utilisant le fichier SQL jobboard.sql fourni :
Allez dans File > Open SQL Script... et sélectionnez le fichier jobboard.sql.
Exécutez le script pour créer les tables et insérer les données.
4. Configuration du backend
Créez un fichier .env dans le répertoire backend avec les variables suivantes :

DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=jobboard
PORT=8800

Remplacez your_user et your_password par vos informations de connexion à MySQL.
5. Frontend
Naviguez dans le répertoire react/jobboard et installez les dépendances :

cd ../react/jobboard
npm install

Lancement du projet
1. Lancer le backend
Assurez-vous d'être dans le dossier backend et démarrez le serveur :
npm start

2. Lancer le frontend
Dans un autre terminal, assurez-vous d'être dans le dossier react/jobboard et démarrez l'application React :
npm start

3. Accéder à l'application
Ouvrez votre navigateur et accédez à l'adresse suivante :
http://localhost:3000

Fonctionnalités
Utilisateur : Créez et modifiez votre profil utilisateur.
Entreprise : Les utilisateurs professionnels peuvent créer et modifier les informations de leur entreprise.
Offres d'emploi : Les entreprises peuvent créer, modifier et supprimer leurs offres d'emploi.
Candidatures : Les utilisateurs peuvent consulter leurs candidatures envoyées.
Technologies utilisées
Frontend :
React
Axios pour les appels API
CSS pour le stylage
Backend :
Node.js
Express
MySQL pour la base de données
Sequelize pour l'ORM (facultatif)
Base de données :
MySQL, géré via MySQL Workbench pour la visualisation et la gestion.
Structure du projet
scss

T-WEB-501-STG_14/
│
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── (autres fichiers de configuration)
│
├── react/jobboard/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Accueil.jsx
│   │   │   ├── Add.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Update.jsx
│   │   │   ├── UserApplications.jsx
│   │   │   └── (autres pages)
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── CircleBackground.jsx
│   │   ├── App.js
│   │   ├── index.js
│   │   └── style.css
│   ├── public/
│   ├── package.json
│   └── .env (si nécessaire pour des clés d'API)
│
├── .gitignore
├── README.md
└── (autres fichiers de configuration)

Notes
Assurez-vous que MySQL est bien démarré avant de lancer le backend.
Utilisez MySQL Workbench pour visualiser les données et les schémas de votre base de données.
Si des erreurs se produisent, vérifiez les logs du backend et du frontend pour des détails supplémentaires.
Auteur
[Votre nom ou pseudo]
Licence
Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.
