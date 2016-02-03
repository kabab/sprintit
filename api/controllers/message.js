var Message = require('../models/Message');
var Projet = require('../models/Projet');
var config = require('../config/config');
var decoder = require('jwt-decode');
var io = require('socket.io')();

var connected = {};

io.on('connection', function(socket) {
  var token = socket.request._query['token'];
  var data = decoder(token);
  connected[data.id] = socket;
});

module.exports.send = function(req, res) {
  var user_to = req.body.to;
  var user_from = req.user.id;
  var projet_id = req.params.id;
  var content = req.body.content;


  var ans = {};
  ans.error = false;

  if (!user_to) {
    ans.error = true;
    ans.data = ['Undefined user'];
    return res.json(ans);
  }

  Projet.find({contributeurs: user_to, contributeurs: user_from, _id: projet_id},
    function(err, projet) {
      if (projet) {
        var msg = new Message();
        msg.content = content;
        msg.projet = projet_id;
        msg.from = user_from;
        msg.to = user_to;
        msg.save(function(err, msg) {
          ans.data = msg;
          // connected[msg.to] && connected[msg.to].emit('new');
          if (connected[msg.to]) {
            connected[msg.to].emit('news');
          }
          res.json(ans);
        });
      } else {
        ans.error = true;
        ans.data = ['Server error'];
        res.json(ans);
      }
    }
  );
};

module.exports.fetch = function(req, res) {
  var ans = {};
  ans.error = false;
  var id1 = req.user.id;
  var id2 = req.params.user_id;
  var projet_id = req.params.id;

  var query = {
    $or : [
      { $and: [{from: id1}, {to: id2}] },
      { $and: [{to: id1}, {from: id2}] },
    ]
  };

  Message.find(query)
    .populate('to from').exec(
      function(err, msgs) {
        ans.data = msgs;
        res.send(ans);
      }
    );
};

module.exports.count = function(req, res) {
  var ans = {};
  ans.error = false;
  var id1 = req.user.id;
  var id2 = req.params.user_id;
  var projet_id = req.params.id;

  Message.count({to: id1, projet: projet_id, view: false},function(err, count) {
        ans.data = count;
        return res.send(ans);
      }
    );

};



module.exports.io = io;
