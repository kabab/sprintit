var express = require('express');
var app = express();
var jwt = require('express-jwt');
var bodyParser = require('body-parser'); //bodyparser + json + urlencoder
var morgan  = require('morgan'); // logger
var config = require('./config/config');
require('./config/mongo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan('dev'));

app.listen(config.api_port);

//Routes
var routes = {};

// routes.utilisateurs = require('./routes/utilisateurs');
routes.projets = require('./routes/projets');

app.use( function(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://localhost');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

//app.use('/users', routes.utilisateurs);
app.use('/projets', routes.projets);

console.log('API start on %d', config.api_port);