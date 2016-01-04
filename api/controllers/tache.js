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

module.exports.assign = function(req, res) {
  var user_id = req.body.user_id;
  var tache_id = req.params.id;

  var ans = {};
  ans.error = false;
  ans.data = [];

  Sprint.find({'taches._id': tache_id})
  .populate('projet')
  .exec(function(err, sprints) {
      sprint = !err && sprints.length > 0 ? sprints[0]: null;
      if (sprint && sprint.projet.owner == req.user.id &&
        sprint.projet.contributeurs.indexOf(user_id) >= 0) {
        ans.data = sprint;
        if (!sprint.taches.id(tache_id).assignee) {
          sprint.taches.id(tache_id).assignee = user_id;
          sprint.save();
          console.log('changed');
        }
      } else {
        ans.data = ["error"];
        ans.error = true;
      }
      res.json(ans);
  });
}
