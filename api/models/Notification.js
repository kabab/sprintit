var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Sprints = require('./Sprint');

var MessageSchema = new Schema({
  type: String,
  date_creation: {type: Date, default: Date.now},
  view: {type: Boolean, default: false},
  description: {type: String},
  projet: {type: Schema.Types.ObjectId, ref: 'Projet'},
});

module.exports = mongoose.model('Message', MessageSchema);
