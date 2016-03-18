var express = require('express');
var router = express.Router();
var allPics;
var mongoose = require('mongoose');
var picModel = require('../config/picModel.js');

router.use('/', function(req, res, next){
	console.log('all pics route middleware called');
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect('mongodb://localhost/pic-wall');
	}

	picModel.find({}, function(err, picsData){
		allPics = picsData[0];
		mongoose.connection.close(function(){
			console.log('Mongoose connection disconnected');
		});
		next();
	 });
});

router.get('/', function(req, res){
	res.json(allPics);
	console.log('router allpics.js allPics', allPics)
});

module.exports = router;