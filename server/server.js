const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secretKey', // Changez ceci pour une clé secrète
    resave: false,
    saveUninitialized: true
}));

// Route pour la page de login
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route pour gérer le formulaire de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'v' && password === 'v') {  // Remplacez par votre utilisateur et mot de passe
        req.session.authenticated = true;
        res.redirect('/private/index.html'); // Redirection vers la page privée
    } else {
        res.redirect('/login.html'); // Redirection vers la page de login en cas d'échec
    }
});

// Middleware pour vérifier l'authentification
function checkAuth(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.redirect('/login.html');
    }
}

// Route pour les fichiers statiques publics
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route pour les fichiers statiques privés avec authentification
app.use('/private', checkAuth, express.static(path.join(__dirname, 'private')));

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
