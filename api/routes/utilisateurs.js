var express = require('express');
var router = express.Router();
var utilisateurCtrl = require('../controllers/utilisateur');

/* GET users listing. */
router.post('/', utilisateurCtrl.register);

module.exports = router;
