var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Sprints = require('./Sprint');

var MessageSchema = new Schema({
  content: String,
  date_creation: {type: Date, default: Date.now},
  from: {type: Schema.Types.ObjectId, ref: 'Utilisateur'},
  to: {type: Schema.Types.ObjectId, ref: 'Utilisateur'},
  view: {type:Boolean, defualt: false},
  projet: {type: Schema.Types.ObjectId, ref: 'Projet'},
});

module.exports = mongoose.model('Message', MessageSchema);
