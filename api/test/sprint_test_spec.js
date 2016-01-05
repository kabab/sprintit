var frisby = require('frisby');
var config = require('../config/config');

var api_url = config.host + ':' + config.api_port + '/sprints';
var test_projet_id = '568afc1dc95e7e783a0e9d35';
var test_other_projet_id = '56827258a1c4d69a2ef62b81';

frisby.create('Login')
    .post(config.host + ':' + config.api_port + "/utilisateurs/login",
        {"email":"kabab1993@gmail.com", "password": "123456"},
        {json:true})
    .expectStatus(200)
    .after(function (err, res, body) {
        frisby.globalSetup({
            request: {
                headers: { 'Authorization': 'Bearer ' + body.data.token }
            }
        });
        frisby.create('Ajouter un sprint a un projet')
            .post(api_url + '/projets/' + test_projet_id, {
              date_debut: '2016-02-26',
              nbr_jour: 20,
              description: "This is a test"
            },{json:true})
            .expectJSON({
              error: false
            })
        .toss();

        frisby.create('Ajouter un sprint a un projet invalide ')
            .post(api_url + '/projets/' + test_other_projet_id, {
              date_debut: '2016-02-26',
              nbr_jour: 20,
              description: "This is a test"
            },{json:true})
            .expectJSON({
              error: true
            })
        .toss();
    })

.toss();
