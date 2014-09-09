
var should = require('should'),
    mongoose = require('mongoose'),
    RootNode = mongoose.model('RootNode');


// Globals

var root_node;

describe('RootNode Model:', function() {
    beforeEach(function(done) {
        root_node = new RootNode();
        done();
    });

    afterEach(function(done) {
        root_node.remove().exec();
        done();
    });
});

