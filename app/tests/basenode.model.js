
var should = require('should'),
    mongoose = require('mongoose'),
    RootNode = mongoose.model('RootNode'),
    BaseNode = mongoose.model('BaseNode');


// Globals

var root_node, simple_node;

before(clearDB);

describe('BaseNode Model:', function() {

    beforeEach(function(done) {
        root_node = new RootNode();
        root_node.save(function(err, node) {
            should.not.exist(err);
            simple_node = new BaseNode({
                parent: root_node.id
            });
            done();
        });
    });

    describe('BaseNode Save', function() {
        it('should be able to save', function(done) {
            simple_node.save(function(err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to show an error when trying to save without a parent', function(done) {
            simple_node.parent = '';
            simple_node.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to tell when it was created', function(done) {
            simple_node.save(function(err, node) {
                should.not.exist(err);
                node.should.have.property('created_at');
                done();
            });
        });

        it('should be able to tell when it was last updated', function(done) {
            simple_node.save(function(err, node) {
                should.not.exist(err);
                node.should.have.property('updated_at');
                done();
            });
        });
    });

    afterEach(function(done) {
        root_node.remove();
        simple_node.remove();
        done();
    });
});

