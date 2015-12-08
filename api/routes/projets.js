var express = require('express');
var router = express.Router();
var projetCtrl = require('../controllers/projet');

/* GET users listing. */
router.post('/', projetCtrl.create);

module.exports = router;
