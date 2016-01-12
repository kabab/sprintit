var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Sprints = require('./Sprint');

var PostItSchema = new Schema({
  description: String,
  projet: {type: Schema.Types.ObjectId, ref: 'Projet'},
  owner: {type: Schema.Types.ObjectId, ref: 'Utilisateur'}
});

module.exports = mongoose.model('PostIt', PostItSchema);
