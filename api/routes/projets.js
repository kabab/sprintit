var express = require('express');
var router = express.Router();
var projetCtrl = require('../controllers/projet');
var jwt = require('express-jwt');
var config = require('../config/config');

router.use(jwt({secret: config.secret}));

router.use(function(req, res, next) {
  
  next();
});

/* GET users listing. */
router.post('/', projetCtrl.create);
router.get('/', projetCtrl.find);

module.exports = router;
