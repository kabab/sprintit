var frisby = require('frisby');
var config = require('../config/config');

var api_url = config.host + ':' + config.api_port + '/projets';

frisby.create('Nouveau utilisateurs email qui existe')
  .post(api_url, {
    email: 'test@exemple.com',
    nom: 'nom',
    prenom: 'prenom',
    password: 'password',
  }, {json: true})
  .expectJSON({
    error: true,
    data: ['Email already exists']
  }).toss();

frisby.create('Login avec mauvais email')
  .post(api_url + '/login', {
    email: 'mauvaisemail@exemple.com',
    password: 'password',
  }, {json: true})
  .expectJSON({
    error: true,
    data: ['Invalid email']
  }).toss();

frisby.create('Login avec mauvais password')
  .post(api_url + '/login', {
    email: 'test@exemple.com',
    password: 'badpassword',
  }, {json: true})
  .expectJSON({
    error: true,
    data: ['Login failed']
  }).toss();

frisby.create('Login avec succes')
  .post(api_url + '/login', {
    email: 'test@exemple.com',
    password: 'password',
  }, {json: true})
  .expectJSONTypes({
    error: Boolean,
    data: {
      token: String
    }
  }).toss();
