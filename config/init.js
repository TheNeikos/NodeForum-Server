
var colors = require('colors');

module.exports = function() {
    if (! process.env.NODE_ENV) {
        console.log('NODE_ENV was not set, defaulting to \'development\''.orange);
        process.env.NODE_ENV = 'development';
    }
};

