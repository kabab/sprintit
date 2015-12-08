var jwt = require("jsonwebtoken");
var config = require("../config/config");
var Utilisateur = require('../models/Utilisateur');
module.exports.register = function(req, res) {
  var utilisateur = new Utilisateur();

  var ans = {};
  ans.error = false;
  ans.data = [];

  utilisateur.email = req.body.email;
  utilisateur.nom = req.body.nom;
  utilisateur.prenom = req.body.prenom;
  utilisateur.password = req.body.password;


  Utilisateur.findOne({'email': req.body.email}, function(err, u) {
    if (u) {
      ans.error = true;
      ans.data.push("Email already exists");
      return res.send(ans);
    }
    utilisateur.save(function(err, user) {
      ans.data = user;
      return res.send(ans);
    });
  });
}

module.exports.login = function(req, res) {

  var email = req.body.email;
  var password = req.body.password;

  var ans = {};
  ans.error = false;
  ans.data = {};

  Utilisateur.findOne({email: email}, function (err, user) {
    if (!user) {
      ans.error = true;
      ans.data.push("Invalid email");
      return res.json(ans);
    }

    user.comparePassword(password, function(isMatch) {
      if (!isMatch) {
        ans.error = true;
        ans.data.push("Login failed");
        return res.json(ans);
      }

      var token = jwt.sign({id: user._id}, config.secret,
      { expiresInMinutes: config.token_expiration });

      ans.data.token = token;

      return res.json(ans);
    });
  });
}
