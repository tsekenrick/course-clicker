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
// app.get('/', (req, res) => {
//     const name = req.session.myName || 'Anonymous';
//     const toGame = (name !== 'Anonymous');
//     res.render('home', {'myName': name, toGame: toGame});
// });

// update save file on button press
app.post('/stats', (req, res) => {
    const name = req.session.myName || 'Anonymous';
    console.log(req.body.happiness);
    SaveFile.findOneAndUpdate({user: name}, {$set: {happiness: req.body.happiness}}, (err, result) => {
        if(err) { res.json({error: "unable to find and update"}); }
        res.json(result);
    });
});

// for polling
app.get('/stats', (req,res) => {
    req.session.myName = sanitize(req.query.user);
    const name = req.session.myName || 'Anonymous';
    SaveFile.findOne({user: name}, (err, result) => {
        // if savefile doesn't exist, make it
        if(err) { 
            const sf = new SaveFile({
                user: req.session.myName
            });

            sf.save((err, savefile) => {
                if(err) { 
                    res.json({error: "unable to save new savefile to db"}); 
                } else {
                    console.log(`Added ${savefile} to db`);
                    req.session.save = savefile;
                    res.json(savefile);
                }
            });
        
        // if found, send it back as json
        } else {
            req.session.save = result;
            res.json(result);
        }
        
    });
});

app.listen(process.env.PORT || 3000);