var Sprint = require('../models/Sprint');

module.exports.create = function (req, res) {

  var ans = {};
  ans.error = false;
  ans.data = [];
  console.log(req.body.date_debut);
  var tache =
  {
    date_debut : new Date(req.body.date_debut.split('T')[0]),
    dure : req.body.dure,
    titre : req.body.titre,
    description: req.body.description
  };

  Sprint.findById(req.params.id)
  .populate('projet')
  .exec(function(err, sprint) {
      console.log(sprint);
      if (sprint && sprint.projet.owner == req.user.id) {
        sprint.taches.push(tache);
        sprint.save();
        tache.etat = 'ToDo';
        ans.data = tache;
      } else {
        ans.data = ["error"];
        ans.error = true;
      }
      res.json(ans);
  });

};

/*
module.exports.find = function(req, res) {
  var ans = {};
  ans.error = false;

  Projet.find({contributeurs: req.user.id, _id:req.params.id})
  .populate('sprints')
  .exec(function(err, projets) {
    if (projets && projets.length == 1) {
      ans.data = projets[0].sprints;
    } else {
      ans.data = ["error"];
      ans.error = true;
    }
    res.json(ans);
  });

};
*/
