var express = require('express');
var router = express.Router();
var allPics;
var mongoose = require('mongoose');
var picModel = require('../config/picModel.js');

router.use('/', function(req, res, next){
	if (mongoose.connection.readyState === 0){
		// var db = mongoose.connect('mongodb://localhost/pic-wall');
		var db = mongoose.connect('mongodb://piet:snot@ds047722.mlab.com:47722/pic-wall')
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
});

module.exports = router;