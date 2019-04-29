require('./db');
const express = require('express');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const path = require('path');
const session = require('express-session');
const app = express();

// currently only works if you run at http, not https (why?)
const sessionOptions = { 
	secret: 'secret for signing session id', 
	saveUninitialized: false, 
    resave: false,
};

app.set('view engine', 'hbs');
app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'dist')));

const SaveFile = mongoose.model('Savefile');
const Upgrade = mongoose.model('Upgrade');

// update save file on button press
app.post('/stats', (req, res) => {
    const name = req.session.myName || 'Anonymous';
    const event = {};
    event[req.body.statName.toLowerCase()] = +req.body.stat;

    SaveFile.findOneAndUpdate({user: name}, {$set: event}, (err, result) => {
        if(err) { res.json({error: "unable to find and update"}); }
        res.json(result);
    });
});

// api endpoint to get savefile info
app.get('/stats', (req,res) => {
    if(req.query.user) { 
        req.session.myName = sanitize(req.query.user); 
        req.session.save(function(err) {
            if(err) { console.log('error saving session'); }
        });
    }  

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
                    req.session.mySave = savefile;
                    res.json(savefile);
                }
            });
        
        // if found, send it back as json
        } else {
            req.session.mySave = result;
            req.session.save(function(err) {
                if(err) { console.log('error saving session'); }
            });
            console.log(`sent ${result}`);
            res.json(result);
        }
    });
});

// app.get('/save', (req, res) => {
//     console.log(req.session.mySave);
//     res.json(req.session.mySave);
// });

app.listen(process.env.PORT || 3000);