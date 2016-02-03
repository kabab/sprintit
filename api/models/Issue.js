var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Sprints = require('./Sprint');

var IssueSchema = new Schema({
  titre: String,
  date_creation: {type: Date, default: Date.now},
  etat: {type: String, default: 'new'}, // New, Fixed, Closed
  priorite: {type: String, default: 'low'}, // Low, Medium, High
  assignee: {type: Schema.Types.ObjectId, ref: 'Utilisateur'},
  projet: {type: Schema.Types.ObjectId, ref: 'Projet'},
  createdBy: {type: Schema.Types.ObjectId, ref: 'Utilisateur'}
});

module.exports = mongoose.model('Issue', IssueSchema);
