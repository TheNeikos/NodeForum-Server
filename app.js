
var init = require('.config/init')(),
    config = require('./config/config'),
    mongoose = require('mongoose'),
    colors = require('colors');

var db = mongoose.connect(config.db, function(err) {
    if (err) {
       console.error('Could not connect to MongoDB!'.red,
               'Is it started?'.grey);
       console.log(err);
    }
});

var app = require('./config/express')(db);

app.listen(config.port);

exports = module.exports = app;

console.log('NodeForum ', '(V '+config.version+')'.grey ,
            ' application started on port ' + config.port);

