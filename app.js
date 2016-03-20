'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

var index = require('./routes/index');
var user = require('./routes/user');
var storePic = require('./routes/storePic');
var removePic = require('./routes/removePic');
var allPics = require('./routes/allPics');
var auth = require('./routes/auth');

var app = express();
// var db = mongoose.connect('mongodb://piet:snot@ds047722.mlab.com:47722/pic-wall')
var picModel = require('./config/picModel.js');

app.use(bodyParser.urlencoded({extended:true}));

app.use(session({secret: 'anything'}));

require('./config/passport')(app);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);
app.use('/store-pic', storePic);
app.use('/remove-pic', removePic);
app.use('/all-pics', allPics);
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


// TODO: remove code below

var picModel = require('./config/picModel');



var allPics = {
	"allPics": [{
        user: "1",
        userName: "MS",
		title: "Goofy",
		url: "http://1.bp.blogspot.com/-YNUuBntvEII/VqMQIi6q5TI/AAAAAAAAbCQ/rLlKiF92gbQ/s1600/hurrah.gif"
	}, {
        user: "1",
        userName: "MS",
		title: "monkey",
		url: "http://images.clipartpanda.com/monkey-clipart-4ib5bExig.jpeg"
	}]
}

console.log(mongoose.connection.readyState);

if (mongoose.connection.readyState === 0) {
    // var db = mongoose.connect('mongodb://localhost/pic-wall');
	var db = mongoose.connect('mongodb://piet:snot@ds047722.mlab.com:47722/pic-wall');
	console.log('connected to db');
	picModel.create({
		pics: allPics.allPics
	}, function(err, pics) {
		if (err) {
			console.log('error storing pics array', err)
		} else {
			mongoose.connection.close(function() {
				console.log('Mongoose connection disconnected');
			});
		}
	});
}


var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});