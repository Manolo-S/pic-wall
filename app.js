'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

var index = require('./routes/index');
var storePic = require('./routes/storePic');
var auth = require('./routes/auth');

var app = express();

var db = mongoose.connect('mongodb://piet:snot@ds019678.mlab.com:19678/poll-app');

var picModel = require('./config/picModel.js');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'anything'}));

require('./config/passport')(app);

app.use('/', index);
app.use('/store-pic', storePic);
app.use('/auth', auth);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

