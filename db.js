const mongoose = require('mongoose');

const User = new mongoose.Schema({
    // username provided by authentication plugin
    // password hash provided by authentication plugin
    saveFile:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'SaveFile' }]
});
  

const Upgrade = new mongoose.Schema({
    name: {type: String, required: true},
    level: {type: Number, min: 0, required: true},
    owned: {type: Boolean, default: false, required: true}
}, {
    _id: true
});


const SaveFile = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    happiness: {type: Number, min: 0, required: true},
    productivity: {type: Number, min: 0, required: true},
    knowledge: {type: Number, min: 0, required: true},
    prestigeCount: {type: Number, min: 0, required: true},
    midtermPassed: {type: Boolean, default: false, required: true},
    finalPassed: {type: Boolean, default: false, required: true},
    happinessUpgrades: [Upgrade],
    prodUpgrade: [Upgrade],
    knowledgeUpgrade: [Upgrade],
    lastPlayed: {type: Date, required: true},
    createdAt: {type: Date, required: true}
});