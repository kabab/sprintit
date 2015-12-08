var express = require('express');
var router = express.Router();
var utilisateurCtrl = require('../controllers/utilisateur');

/* GET users listing. */
router.post('/', utilisateurCtrl.register);
router.post('/login', utilisateurCtrl.login);

module.exports = router;
