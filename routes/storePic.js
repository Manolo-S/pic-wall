'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var picModel = require('../config/picModel');
var allPics;

function callback(){
	console.log('callback', allPics)
	picModel.create({
		pics: allPics
	}, function(err, pics){
			if (err) {
				console.log('error storing pics array', err) 
			} else {
				mongoose.connection.close(function() {
		            console.log('Mongoose connection disconnected');
	    		});
			}
	   } 
 	);
}


function storePic(){
	console.log('store pic fun called')
	// if (mongoose.connection.readyState === 0) { 
		var db = mongoose.connect('mongodb://piet:snot@ds047722.mlab.com:47722/pic-wall')
		// var db = mongoose.connect('mongodb://localhost/pic-wall');
		picModel.remove({}, callback);
	// }
}


router.post('/', function(req, res){
	allPics = req.body.data;
	storePic();
});

module.exports = router;



