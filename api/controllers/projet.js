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

module.exports.findone = function(req, res) {
  var ans = {};
  ans.error = false;
  var id = req.params.id;
  Projet.findOne({_id:id, contributeurs: req.user.id})
    .populate('contributeurs owner').exec( function(err, projets) {
    if (projets) {
      ans.data = projets;
    } else {
      ans.data = ["error"];
      ans.error = true;
    }
    res.json(ans);
  });
}

module.exports.update = function(req, res) {

}

module.exports.add_ressource = function(req, res) {
  var ans = {};
  ans.error = false;

  var id = req.params.id;
  var email = req.body.email;

  Projet.findOne({_id:id, owner: req.user.id}, function(err, projet) {
    if (projet) {
      Utilisateur.findOne({email: email}, function(err, u) {
        if (u) {
          if (projet.contributeurs.indexOf(u._id) >= 0) {
            ans.data = ["User already added"];
            ans.error = true;
          } else {
            ans.data = u;
            projet.contributeurs.push(u._id);
            projet.save();
          }
        } else {
          ans.data = ["User not found"];
          ans.error = true;
        }
        res.json(ans);
      })
    } else {
      ans.data = ["You can't add ressource"];
      ans.error = true;
      res.json(ans);
    }
  });
}

module.exports.delete_ressource = function(req, res) {
  var ans = {};
  ans.error = false;
  var id = req.params.id;
  var u_id= req.params.id2;

  Projet.findOne({_id:id, owner: req.user.id}, function(err, projet) {
    if (projet && projet.owner != u_id) {
      projet.contributeurs.pull(u_id);
      projet.save(function(err, projet) {
        ans.data = projet;
        res.json(ans);
      });
    } else {
      ans.data = ["You can't delete ressource"];
      ans.error = true;
      res.json(ans);
    }
  });
}
