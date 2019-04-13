const mongoose = require('mongoose');

const User = new mongoose.Schema({
    // username provided by authentication plugin
    // password hash provided by authentication plugin
    saveFile:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'SaveFile' }]
});
  

const UpgradeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    level: {type: Number, min: 0, required: true},
    owned: {type: Boolean, default: false, required: true}
}, {
    _id: true
});

const SaveFileSchema = new mongoose.Schema({
    user: {type: String, required: true},
    happiness: {type: Number, min: 0, default: 0, required: true},
    productivity: {type: Number, min: 0, default: 0, required: true},
    knowledge: {type: Number, min: 0, default: 0, required: true},
    prestigeCount: {type: Number, min: 0, default: 0, required: true},
    midtermPassed: {type: Boolean, default: false, required: true},
    finalPassed: {type: Boolean, default: false, required: true},
    happinessUpgrades: [UpgradeSchema],
    prodUpgrade: [UpgradeSchema],
    knowledgeUpgrade: [UpgradeSchema],
    lastPlayed: {type: Date, default: Date.now, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

mongoose.model("Upgrade", UpgradeSchema);
mongoose.model("Savefile", SaveFileSchema);

// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
    // if we're in PRODUCTION mode, then read the configration from a file
    // use blocking file io to do this...
    const fs = require('fs');
    const path = require('path');
    const fn = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(fn);
    // our configuration file will be in json, so parse it and set the
    // conenction string appropriately!
    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
    // if we're not in PRODUCTION mode, then use
    dbconf = 'mongodb://localhost/courseClicker';
}

mongoose.connect(dbconf, {
    useCreateIndex: true,
    useNewUrlParser: true
});