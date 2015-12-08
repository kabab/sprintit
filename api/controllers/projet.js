var Projet = require('../models/Projet');

module.exports.create = function (req, res) {
  var projet = new Projet();

  var ans = {};
  ans.error = false;
  ans.data = [];

  projet.titre = req.body.titre;
  projet.date_debut = req.body.date_debut;
  projet.date_fin = req.body.date_fin;
  projet.date_fin = req.body.description;

  projet.save(function(err, projet) {
    if (!err) {
      ans.data = projet;
    } else {
      ans.error = true;
    }
    return res.json(ans);
  });
}
