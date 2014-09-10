
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    BaseSchema = require('./basenode').base_schema,
    BaseNode = mongoose.model('BaseNode'),
    bcrypt = require('bcrypt');

var UserSchema = new BaseSchema({
    email: String,
    displayName: String,
    passwordHash: String
});

UserSchema.path('email').validate(function(value) {
    return /.+@.+\..+/.test(value);
});

UserSchema.statics.login = function(email, password, cb) {
    this.findOne({email: email}, function(err, user){
        if (err) return cb(err);
        if (!user) return cb("User not found.");

        bcrypt.compare(password, user.passwordHash, function(err, res) {
            if (err) return cb(err);
            if (!res) return cb("User not found.");
            cb(undefined, user);
        });
    });
}


var User = BaseNode.discriminator('User', UserSchema);

