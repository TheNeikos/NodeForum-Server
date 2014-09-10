
var should = require('should'),
    mongoose = require('mongoose'),
    RootNode = mongoose.model('RootNode');


// Globals

var root_node;

describe('RootNode Model:', function() {
    beforeEach(function(done) {
        root_node = new RootNode();
        mongoose.connection.db.dropDatabase(done);
    });

    describe('Method Save', function() {
        it('should be able to save', function(done) {
            root_node.save(function(err) {
                should.not.exist(err);
                done();
            });
        });
    });

    describe('Method Unique', function() {
        it('should exist only one RootNode', function(done) {
            root_node.save(function(err) {
                should.not.exist(err);
                new RootNode().save(function(err2) {
                    should.exist(err2);
                    done();
                });
            });
        });
    });

    afterEach(function(done) {
        root_node.remove();
        done();
    });
});

