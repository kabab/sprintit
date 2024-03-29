var Sprint = require('../models/Sprint');
var Projet = require('../models/Projet');

module.exports.create = function (req, res) {
  var sprint = new Sprint();

  var ans = {};
  ans.error = false;
  ans.data = [];

  console.log(req.body.date_debut);

  sprint.date_debut = new Date(req.body.date_debut);
  sprint.date_fin = new Date(req.body.date_debut);
  sprint.date_fin.setDate(sprint.date_debut.getDate() + parseInt(req.body.nbr_jour));
  sprint.description = req.body.description;
  sprint.projet = req.params.id;
  console.log(sprint);

  Projet.find({owner: req.user.id, _id:req.params.id}, function(err, projets) {
    if (projets && projets.length > 0) {
      sprint.save(function(err, sprint) {
        if (!err) {
          ans.data = sprint;
          projets[0].sprints.push(sprint._id);
          projets[0].save();
        } else {
          ans.data = ["Server error"];
          ans.error = true;
        }
        return res.json(ans);
      });
    } else {
      ans.data = ["Invalide action"];
      ans.error = true;
      res.json(ans);
    }
  });

};

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
