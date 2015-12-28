var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SprintSchema = new Schema({
  date_debut: Date,
  date_fin: Date,
  description: String,
  projet: {type: Schema.Types.ObjectId, ref: 'Projet'},
  taches: [{
    date_debut: Date,
    dure: Number,
    titre: String,
    assignee: {type: Schema.Types.ObjectId, ref: 'Utilisateur'}
  }]
});

module.exports = mongoose.model('Sprint', SprintSchema);
