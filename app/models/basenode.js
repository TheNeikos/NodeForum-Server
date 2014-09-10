
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    util = require('util');

function BaseSchema() {
    Schema.apply(this, arguments);
    this.add({
        children: [Schema.Types.ObjectId],
        parent: Schema.Types.ObjectId,
    });
};
util.inherits(BaseSchema, Schema);

var BaseNodeSchema = new BaseSchema();

BaseNodeSchema.path('parent').validate(function(value) {
    return value != undefined && value != null && value != ""
}, 'Invalid parent');

var BaseNode = mongoose.model('BaseNode', BaseNodeSchema);
module.exports.base_schema = BaseSchema;

