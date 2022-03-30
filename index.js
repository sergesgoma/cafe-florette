const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path:'./.env'});

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

// mise en place de la connexion par défaut
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true}, { useUnifiedTopology: true });

// connexion par défaut
const db = mongoose.connection;

// ajout d'un événement erreur et succès (pour recevoir un message dans la console en cas d'erreur ou de succès de connexion à la BDD)
db.on('error', () => console.log('Error in connecting to Database'));
db.once('open', () => console.log('Connected to Database'));

// création d'un schéma de BDD MongoDB
const contactSchema = {
    nom: String,
    prenom: String,
    email: String
}

const Contact = mongoose.model("Contact", contactSchema);

// routes
app.post('/', (req,res) => {
    let newContact = new Contact({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email:req.body.email
    })
    newContact.save();
    res.sendFile(path.join(__dirname, 'contact.html'));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/where.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'where.html'));
})

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
})

app.listen(3000, () => {
    console.log('Listening on 3000...');
})