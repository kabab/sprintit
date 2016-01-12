var express = require('express');
var router = express.Router();
var postitCtrl = require('../controllers/postit');
var jwt = require('express-jwt');
var config = require('../config/config');

router.use(function(req, res, next) {
  if(!req.headers.authorization) return res.send(401);
  return next()
});

router.use(jwt({secret: config.secret}));

/* GET users listing. */
router.post('/projets/:id/', postitCtrl.create);
router.get('/projets/:id/', postitCtrl.find);
router.delete('/:id', postitCtrl.delete);

module.exports = router;
