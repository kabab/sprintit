var express = require('express');
var router = express.Router();
var tacheCtrl = require('../controllers/tache');
var jwt = require('express-jwt');
var config = require('../config/config');

router.use(function(req, res, next) {
  if(!req.headers.authorization) return res.send(401);
  return next();
});

router.use(jwt({secret: config.secret}));

/* GET users listing. */
router.post('/sprints/:id/', tacheCtrl.create);
// router.get('/sprints/:id/', tacheCtrl.find);

module.exports = router;
