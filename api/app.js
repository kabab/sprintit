var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //bodyparser + json + urlencoder
var morgan  = require('morgan'); // logger
var config = require('./config/config');
require('./config/mongo');
var server = require('http').Server(app);

require('./controllers/message').io.attach(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan('dev'));

server.listen(config.api_port);

//Routes
var routes = {};


routes.utilisateurs = require('./routes/utilisateurs');
routes.projets = require('./routes/projets');
routes.sprints = require('./routes/sprints');
routes.taches = require('./routes/taches');
routes.postits = require('./routes/postits');
routes.messages = require('./routes/messages');
routes.issues = require('./routes/issues');

app.use( function(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://localhost');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

app.use('/utilisateurs', routes.utilisateurs);
app.use('/projets', routes.projets);
app.use('/sprints', routes.sprints);
app.use('/taches', routes.taches);
app.use('/postits', routes.postits);
app.use('/messages', routes.messages);
app.use('/issues', routes.issues);


console.log('API start on %d', config.api_port);
