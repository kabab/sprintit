var Issue = require('../models/Issue');

module.exports.find = function (req, res) {
  var ans = {};
  ans.error = false;
  ans.data = [];

  var page_num = req.params.page;
  var projet_id = req.params.id;

  Issue.find({projet: projet_id})
    .sort({date_creation: -1})
    .populate('createdBy assignee', '-password -projets')
    .exec(function(err, issues) {
    if (issues) {
      ans.error = false;
      ans.data = issues;
    } else {
      ans.error = true;
      ans.data = ['Cannot load issues'];
    }
    return res.json(ans);
  });
};

module.exports.add = function (req, res) {
  var issue = new Issue();

  var ans = {};
  ans.error = false;
  ans.data = [];

  var projet_id = req.params.id;

  issue.titre = req.body.titre || '';
  issue.projet = req.params.id;
  issue.createdBy = req.user.id;
  issue.priorite = req.body.priorite;

  if (issue.titre.length == 0) {
    ans.error = true;
    ans.data = ['Title is not defined'];
    return res.json(ans);
  }

  issue.save(function(err, issue) {
    if (issue) {
      ans.error = false;
      ans.data = issue;
    } else {
      ans.error = false;
      ans.data = ['Server cannot save the issue'];
    }
    res.json(issue);
  });
}

module.exports.count = function (req, res) {

  var projet_id = req.params.id;

  var ans = {};
  ans.error = false;
  ans.data = [];

  console.log(projet_id);
  Issue.count({}, function(err, c) {
    if (c) {
      ans.error = false;
      ans.data = c;
    } else {
      ans.error = true;
      ans.data = ['Server error'];
    }
    res.json(ans);
  });
}

module.exports.doit = function(req, res) {
  var ans = {};
  ans.error = false;
  ans.data = [];

  var issue_id = req.params.id;


  Issue.findOne({_id: issue_id})
    .populate('projet')
    .exec(function(err, issue) {
      if (issue)  {
        if (typeof issue.assignee != 'undefined' || issue.projet.contributeurs.indexOf(req.user.id) < 0) {
          ans.error = true;
          ans.data = ['Operation not permitted'];
        } else {
          issue.assignee = req.user.id;
          ans.error = false;
          issue.save();
        }
      } else {
        ans.error = true;
        ans.data = ['Server error'];
      }
      res.json(ans);
    });
}
module.exports.change_state = function(req, res) {
  var ans = {};
  ans.error = false;
  ans.data = [];

  var issue_id = req.params.id;

    Issue.findOne({_id: issue_id, }, function(err, issue) {

    });
}
