
var should = require('should'),
    mongoose = require('mongoose'),
    RootNode = mongoose.model('RootNode'),
    BaseNode = mongoose.model('BaseNode'),
    User     = mongoose.model('User'),
    bcrypt   = require('bcrypt');


// Globals

var root_node, thomas;

before(clearDB);

describe('User Model:', function() {

    beforeEach(function(done) {
        root_node = new RootNode();
        root_node.save(function(err, node) {
            should.not.exist(err);
            thomas = new User({
                email: "asf@asd.co",
                displayName: "ThomasEngine",
                passwordHash: "$2a$10$Km.vBewX43dW4pWnqSqgBe7nlziis/oR5SlCGT1klsjhfcjccTIqK", //hackitall with bcrypt
            });
            done();
        });
    });

    describe('User Save', function() {
        it('should be able to save with correct data', function(done) {
            thomas.save(function(err, tho) {
                should.not.exist(err);
                done();
            });
        });

        it('should not be able to save without a valid email', function(done) {
            thomas.email = "";
            thomas.save(function(err, tho) {
                should.exist(err);

                thomas.email = "123";
                thomas.save(function(err, tho) {
                    should.exist(err);
                    done();
                });
            });
        });

        it('should be able to update the password', function(done) {
            this.slow(200);
            thomas.password = "hackitall";
            thomas.save(function(err, tho) {
                should.not.exist(err);
                tho.should.have.property("passwordHash");
                bcrypt.compare(thomas.password, tho.passwordHash, function(err, res) {
                    should.not.exist(err);
                    res.should.be.true;
                    done()
                });
            });
        });
    });

    describe('User Login', function() {
        it('should be able to login with password and email', function(done) {
            thomas.save(function(err, tho) {
                should.not.exist(err);
                User.login(tho.email, "hackitall", function(err, user) {
                    should.not.exist(err);
                    (tho === user).should.be.true;
                    done();
                });
            });
        });

        it('should not be able to login with wrong password/email', function(done) {
            thomas.save(function(err, tho) {
                should.not.exist(err);
                User.login(tho.email, "hacll", function(err, user) {
                    should.exist(err);
                    (tho === user).should.be.false;
                    done();
                });
            });
        });
    });

    afterEach(function(done) {
        root_node.remove();
        thomas.remove();
        done();
    });
});

