var express = require('express');
var router = express.Router();
var messageCtrl = require('../controllers/message');
var jwt = require('express-jwt');
var config = require('../config/config');

router.use(function(req, res, next) {
  if(!req.headers.authorization) return res.send(401);
  return next()
});

router.use(jwt({secret: config.secret}));
router.get('/:id/count', messageCtrl.count);
router.post('/:id', messageCtrl.send);
router.get('/:id/:user_id', messageCtrl.fetch);

module.exports = router;
