var express = require('express');
var router = express.Router();
var issueCtrl = require('../controllers/issue');
var jwt = require('express-jwt');
var config = require('../config/config');

router.use(function(req, res, next) {
  if(!req.headers.authorization) return res.send(401);
  return next()
});

router.use(jwt({secret: config.secret}));
router.post('/:id', issueCtrl.add);
router.get('/:id/count', issueCtrl.count);
router.get('/:id/doit', issueCtrl.doit);
router.get('/:id/:page', issueCtrl.find);

module.exports = router;
