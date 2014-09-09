
var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')({
        session: session
    }),
    config = require('./config');

module.exports = function(db) {
    var app = express();

    var modelFiles = fs.readdirSync('./app/models');
    modelFiles.forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });

    app.locals.title = config.app.title;

    app.set('showStackError', true);

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(cookieParser());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: new mongoStore({
            db: db.connection.db,
            collection: config.sessionCollection
        })
    }));

    var controllerFiles = fs.readdirSync('./app/controllers');
    controllerFiles.forEach(function(controllerPath) {
        require(path.resolve(controllerPath)(app));
    });

    app.use(function(err, req, res, next) {
        if (!err) return next();

        console.error(err.stack);

        res.status(500).json('500', {
            error: err.stack
        });
    });

    app.use(function(req, res) {
        res.status(404).json({
            error: 'Not Found'
        });
    });

    return app;
}


