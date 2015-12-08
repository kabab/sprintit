var Projet = require('../models/Projet');

module.exports.create = function (req, res) {
  var projet = new Projet();

  projet.titre = req.body.titre;
  projet.date_debut = req.body.date_debut;
  projet.date_fin = req.body.date_fin;

  projet.save(function(err, projet) {
    if (!err) {
      return res.json(projet);
    } else {
      return res.send(403);
    }
  });
}
