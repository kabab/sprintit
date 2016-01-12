var PostIt = require('../models/PostIt');
var Projet = require('../models/Projet');

module.exports.create = function (req, res) {
  var postit = new PostIt();

  var ans = {};
  ans.error = false;
  ans.data = [];

  postit.description = req.body.description;
  postit.projet = req.params.id;
  postit.owner = req.user.id;

  Projet.find({owner: req.user.id, _id:req.params.id}, function(err, projets) {
    if (projets && projets.length > 0) {
      postit.save(function(err, sprint) {
        if (!err) {
          ans.data = postit;
          projets[0].postits.push(postit._id);
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
  .populate('postits')
  .exec(function(err, projets) {
    //console.log(projets);
    PostIt.populate(projets, {
      path: 'postits.owner',
      model: 'Utilisateur'
    }, function (err, projets) {
      if (projets && projets.length == 1) {
        ans.data = projets[0].postits;
      } else {
        ans.data = ["error"];
        ans.error = true;
      }
      res.json(ans);
    });

  });
}

module.exports.delete = function(req, res) {
  var ans = {};
  //var postit = new PostIt();
  ans.error = false;
  //var id = req.params.id;
  var p_id= req.params.id;

  Projet.findOne({postits: p_id}, function(err, projet) {
    if (projet) {
      PostIt.findById(p_id, function(err, postit) {
        if (postit.owner == req.user.id) {
          projet.postits.pull(p_id);
          postit.remove();
          projet.save(function(err, projet) {
            ans.data = postit;
            res.json(ans);
          });
        }
      });
    } else {
      ans.data = ["You can't delete postit"];
      ans.error = true;
      res.json(ans);
    }
  });
}
