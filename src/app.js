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
app.use(express.static(path.join(__dirname, '..', 'dist')));

const SaveFile = mongoose.model('Savefile');
const Upgrade = mongoose.model('Upgrade');

// landing page
app.get('/', (req, res) => {
    const name = req.session.myName || 'Anonymous';
    const toGame = (name !== 'Anonymous');
    res.render('home', {'myName': name, toGame: toGame});
});

// ask user for their name then redirect to main game
app.post('/', (req, res) => {
    req.session.myName = sanitize(req.body.firstName);
    
    // make new save file if it doesn't exist
    SaveFile.findOne({user: req.session.myName}, (err, result) => {
        if(err || !result) {
            const sf = new SaveFile({
                user: req.session.myName
            });

            sf.save((err, savefile) => {
                if(err) { 
                    res.render('home'); 
                } else {
                    console.log(`Added ${savefile} to db`);
                    req.session.save = savefile;
                    res.render('home', {toGame: true});
                }
            });
        // found matching save
        } else {
            req.session.save = result;
            res.render('home', {toGame: true});
        }
    });
    res.redirect('/game');
});

app.get('/game', (req, res) => {
    const name = req.session.myName || 'Anonymous';
    if(name === 'Anonymous') { res.redirect('/'); }
    SaveFile.findOne({user: name}, (err, result) => {
        if(err) { res.render('index'); }
        res.render('game', {result});
        // TODO: make this work
        // res.sendFile(path.join(__dirname, '..', 'public/index.html'));
        // document.querySelector("#happyVal").textContent = result.happiness;
    });
});

// update save file on button press using xhr
app.post('/game', (req, res) => {
    const name = req.session.myName || 'Anonymous';
    console.log(req.body.happiness);
    SaveFile.findOneAndUpdate({user: name}, {$set: {happiness: req.body.happiness}}, (err, result, count) => {
        if(err) res.send(err);
        res.send(result);
    });
});

// for polling
app.get('/stats', (req,res) => {
    const name = req.session.myName || 'Anonymous';
    SaveFile.find({user: name}, (err, result) => {
        if(err) { res.render('home'); }
        res.json(result);
    });
});

app.listen(process.env.PORT || 3000);