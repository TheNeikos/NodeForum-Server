
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    BaseSchema = require('./basenode').base_schema,
    BaseNode = mongoose.model('BaseNode');

var RootNodeSchema = new BaseSchema({
});

RootNodeSchema.pre('save', true, function(next, done) {
    RootNode.findOne({}, function(err, node) {
        if(err) {
            next(err);
            return;
        }
        if(node) {
            next(new Error('There already exists a RootNode'));
            return;
        }
        next();
        done();
    });
});

var RootNode = BaseNode.discriminator('RootNode', RootNodeSchema);

