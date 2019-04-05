require('./db.js');

const express = require('express');
const path = require('path');

const app = express();
const session = require('express-session');

app.set('view engine', 'hbs');
app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});
  
app.listen(3000);