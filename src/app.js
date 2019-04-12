require('./db');
const express = require('express');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const path = require('path');
const session = require('express-session');
const app = express();

const sessionOptions = { 
	secret: 'secret for signing session id', 
	saveUninitialized: false, 
	resave: false 
};

app.set('view engine', 'hbs');
app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const SaveFile = mongoose.model('Savefile');
const Upgrade = mongoose.model('Upgrade');

// landing page
app.get('/', (req, res) => {
    const name = req.session.myName || 'Anonymous';
    res.render('index', {'myName': name});
});

// ask user for their name then redirect to main game
app.post('/', (req, res) => {
    req.session.myName = sanitize(req.body.firstName);
    
    // make new save file if it doesn't exist
    // const save = new SaveFile({

    // });
    res.redirect('/game');
});

// send result query for savefile document based on req.session.myName to xhr
app.get('/game', (req, res) => {
    const name = req.session.myName || 'Anonymous';
    SaveFile.find({}, (err, result) => {
        if(err) { res.render('index'); }
        res.json(result);
    });
});

// update save file on button press using xhr
app.post('/game', (req, res) => {
    const name = req.session.myName || 'Anonymous';
    // find and update document based on name
});

app.listen(process.env.PORT || 3000);