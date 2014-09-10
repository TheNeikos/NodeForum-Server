
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    BaseSchema = require('./basenode').base_schema,
    BaseNode = mongoose.model('BaseNode');

var UserSchema = new BaseSchema({
    email: String,
    displayName: String,
    passwordHash: String
});

UserSchema.path('email').validate(function(value) {
    return /.+@.+\..+/.test(value);
});


var User = BaseNode.discriminator('User', UserSchema);

