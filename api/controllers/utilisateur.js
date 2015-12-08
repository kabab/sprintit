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
