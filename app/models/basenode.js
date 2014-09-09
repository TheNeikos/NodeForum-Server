
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BaseNodeSchema = new Schema({
    children: [BaseNodeSchema],
    parent: BaseNodeSchema,
});

BaseNodeSchema.path('parent').validate(function() {
    return parent != undefined || parent != null || parent != ''
}, 'Invalid parent');

var BaseNode = mongoose.model('BaseNode', BaseNodeSchema);

