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
	if (mongoose.connection.readyState === 0) { 
		var db = mongoose.connect('mongodb://localhost/pic-wall');
		picModel.remove({}, callback);
	}
}


router.post('/', function(req, res){
	console.log(req.body.data);
	allPics = req.body.data;
	storePic();
});

module.exports = router;



