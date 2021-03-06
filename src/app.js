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
    const name = req.body.name;
    const event = {};

    if(req.body.statName !== "prestigeCount") {
        event[req.body.statName.toLowerCase()] = +req.body.stat;
    } else {
        event[req.body.statName] = +req.body.stat;
        event['happiness'] = 0;
        event['productivity'] = 0;
        event['knowledge'] = 0;
        event['happinessUpgrades'] = [];
        event['prodUpgrade'] = [];
        event['knowledgeUpgrade'] = [];
    }
    console.log(event);

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

    const name = sanitize(req.query.user);
    SaveFile.findOne({user: name}, (err, result) => {
        // if savefile doesn't exist, make it
        if(err || !result) { 
            const sf = new SaveFile({
                user: name
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

app.post('/upgrades', (req,res) => {

    const name = req.body.name;
    let upgradeString = "";
    switch(req.body.statName) {
        case "Happiness":
            upgradeString = 'happinessUpgrades';
            break;
        case "Productivity":
            upgradeString = 'prodUpgrade';
            break;
        case "Knowledge":
            upgradeString = 'knowledgeUpgrade';
            break;
    }

    const query = {};
    query['user'] = name;
    query[upgradeString] = { $elemMatch: {name: req.body.upgradeName}};

    SaveFile.findOne(query, (err, result) => {
        // if unable to find upgrade in savefile, add the upgrade
        if(err || !result) { 
            const upgrade = new Upgrade({
                name: req.body.upgradeName,
                level: req.body.level,
                owned: req.body.owned
            });

            const event = {};
            switch(req.body.statName) {
                case "Happiness":
                    event['happinessUpgrades'] = upgrade;
                    break;
                case "Productivity":
                    event['prodUpgrade'] = upgrade;
                    break;
                case "Knowledge":
                    event['knowledgeUpgrade'] = upgrade;
                    break;
            }
            console.log(event);
            
            const event2 = {};
            event2[req.body.statName.toLowerCase()] = +req.body.cost;

            SaveFile.findOneAndUpdate({user: name}, {$push: event, $set: event2}, (err, upgrade) => {
                if(err) { 
                    res.json({error: `unable to save new upgrade to db: ${err}`}); 
                } else {
                    console.log(`Added ${upgrade} to db`);
                    res.json(upgrade);
                }
            });
        
        // if found, send it back as json
        } else {
            console.log(`upgrade already existed: ${result}`);
            res.json(result);
        }
    });
});

app.listen(process.env.PORT || 3000);