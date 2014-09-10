
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    util = require('util');

function BaseSchema() {
    Schema.apply(this, arguments);
    this.add({
        children: [Schema.Types.ObjectId],
        parent: Schema.Types.ObjectId,
        created_at: Date,
        updated_at: Date,
    });
};
util.inherits(BaseSchema, Schema);

var BaseNodeSchema = new BaseSchema();

BaseNodeSchema.path('parent').validate(function(value) {
    return value != undefined && value != null && value != ""
}, 'Invalid parent');

BaseNodeSchema.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});

var BaseNode = mongoose.model('BaseNode', BaseNodeSchema);
module.exports.base_schema = BaseSchema;

