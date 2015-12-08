var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var config = require('../config/config');

var UtilisateurSchema   = new Schema({
    email: String,
    nom: String,
    prenom: String,
    password: String,
    projets: [{
      type: Schema.Types.ObjectId, // ADMIN, DEV
      ref: 'Projet'
    }],
    created_at: {type: Date, default: Date.now},
    activated: {type: Boolean, default: true}
});

UtilisateurSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(config.salt_work_factor, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
  });
});

//Password verification
UtilisateurSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

module.exports = mongoose.model('Utilisateur', UtilisateurSchema);
