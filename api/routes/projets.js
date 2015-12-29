var express = require('express');
var router = express.Router();
var projetCtrl = require('../controllers/projet');
var jwt = require('express-jwt');
var config = require('../config/config');

router.use(function(req, res, next) {
  if(!req.headers.authorization) return res.send(401);
  return next()
});

router.use(jwt({secret: config.secret}));

/* GET users listing. */
router.post('/', projetCtrl.create);
router.get('/', projetCtrl.find);
router.get('/:id', projetCtrl.findone);

module.exports = router;
