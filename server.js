//require depenciess
var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var DB_URI = "mongodb://localhost:27017/portfolio";
var session = require('express-session');


var app = express();

app.set('view engine', 'ejs');

// configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+ '/AllinAll'));
app.use(session({
  secret: 'Andrew',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(function (req, res, next) {
  req.session.user = req.user || null;
  res.locals.user = req.user || null;
  next();
});

mongoose.connect(DB_URI);
app.use(router);

// start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
})