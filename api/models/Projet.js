var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Sprints = require('./Sprint');

var ProjetSchema = new Schema({
  titre: String,
  date_creation: {type: Date, default: Date.now},
  date_debut: Date,
  date_fin: Date,
  description: String,
  owner: {type: Schema.Types.ObjectId, ref: 'Utilisateur'},
  contributeurs: [{type: Schema.Types.ObjectId, ref: 'Utilisateur'}],
  sprints: [{type: Schema.Types.ObjectId, ref: 'Sprint'}]
});

module.exports = mongoose.model('Projet', ProjetSchema);
