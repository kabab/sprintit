var Projet = require('../models/Projet');
var Utilisateur = require('../models/Utilisateur');

module.exports.create = function (req, res) {
  var projet = new Projet();

  var ans = {};
  ans.error = false;
  ans.data = [];

  projet.titre = req.body.titre;
  projet.date_debut = new Date(req.body.date_debut.split('T')[0]);
  projet.date_fin = new Date(req.body.date_fin.split('T')[0]);
  projet.description = req.body.description;
  projet.owner = req.user.id;
  projet.contributeurs.push(req.user.id);

  projet.save(function(err, projet) {
    if (!err) {
      ans.data = projet;
      Utilisateur.findById(req.user.id, function(err, u) {
        if (u) {
          if (!u.projets) {
            u.projets = [];
          }
          u.projets.push(projet._id);
        }
        u.save();
      });
    } else {
      ans.error = true;
    }

    return res.json(ans);
  });
};

module.exports.find = function(req, res) {
  var ans = {};
  ans.error = false;

  Projet.find({contributeurs: req.user.id}, function(err, projets) {
    if (projets) {
      ans.data = projets;
    } else {
      ans.data = ["error"];
      ans.error = true;
    }
    res.json(ans);
  });
};

module.exports.update = function(req, res) {

}
