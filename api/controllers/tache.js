var Sprint = require('../models/Sprint');
var moment = require('moment');

module.exports.create = function (req, res) {
  var ans = {};
  ans.error = false;
  ans.data = [];
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
      if (sprint && sprint.projet.owner == req.user.id) {
        sprint.taches.push(tache);
        sprint.save();
        tache.etat = 'todo';
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
        }
      } else {
        ans.data = ["error"];
        ans.error = true;
      }
      res.json(ans);
  });
};

module.exports.user_tasks = function(req, res) {
  var current = new Date();
  var projet_id = req.params.id;

  var ans = {};
  ans.error = false;
  ans.data = [];

  Sprint.find({date_debut: {"$lte": current}, date_fin: {"$gte": current},
    projet: projet_id, 'taches.assignee': req.user.id},
    function(err, sprints) {
      if (sprints.length > 0) {
        sprint = sprints[sprints.length - 1];
        ans.data = []
        for (i = 0; i < sprint.taches.length; i++) {
          if (sprint.taches[i].assignee == req.user.id) {
            ans.data.push(sprint.taches[i]);
          }
        }
      } else {
        ans.error = true;
        ans.data = ['No tasks in database'];
      }
      res.send(ans);
  });
};

module.exports.change_state = function(req, res) {
  var task_id = req.params.id;
  var state = req.body.state;

  var ans = {};
  ans.error = false;
  ans.data = [];

  Sprint.find({'taches._id': task_id, 'taches.assignee': req.user.id},
    function(err, sprints) {
      if (sprints && sprints.length > 0) {
        var task = sprints[0].taches.id(task_id);
        var order = {todo: 0, doing: 1, done: 2};
        var source = sprints[0].taches.id(task_id).etat;
        if (order[state] > order[source] ) {
          sprints[0].taches.id(task_id).etat = state;
          sprints[0].save();
          ans.error = true;
          ans.data = ['Impossible opertation'];
        } else {
          ans.data = sprint.taches;
        }
      } else {
        ans.error = true;
        ans.data = ['No tasks in database'];
      }
      res.send(ans);
  });

};
