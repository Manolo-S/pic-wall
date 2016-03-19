'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var picModel = require('../config/picModel');
var url;

function callback(err, result){
	console.log('callback');
	if (err){
		console.log(error)
	} else { 
		console.log(result.result)
		mongoose.connection.close(function() {
		            console.log('Mongoose connection disconnected');
	    });
	}
}


function removePic(){
	if (mongoose.connection.readyState === 0) { 
		console.log('removepic', url);
		// var db = mongoose.connect('mongodb://localhost/pic-wall');
		var db = mongoose.connect('mongodb://piet:snot@ds047722.mlab.com:47722/pic-wall')
		picModel.update( {}, { $pull : { pics : {"url": url} } }, {multi: true}, callback)
	}
}


router.post('/', function(req, res){
	url = req.body.url;
	removePic();
});

module.exports = router;



