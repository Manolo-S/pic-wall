var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PicSchema = new Schema({
	title: String,
	url: String,
	_id: false
});

var PicsSchema = new Schema({
	pics: [PicSchema]
});

module.exports = mongoose.model('pics', PicsSchema);

