var express = require('express');
var router = express.Router();
var sprintCtrl = require('../controllers/sprint');
var jwt = require('express-jwt');
var config = require('../config/config');

router.use(function(req, res, next) {
  if(!req.headers.authorization) return res.send(401);
  return next()
});

router.use(jwt({secret: config.secret}));

/* GET users listing. */
router.post('/projets/:id/', sprintCtrl.create);
router.get('/projets/:id/', sprintCtrl.find);

module.exports = router;
