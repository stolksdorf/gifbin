var mongoose = require('mongoose');

var GifSchema = mongoose.Schema({
	id          : String,
	link        : String,
	created     : { type: Date,    default: Date.now },
	uploader    : String,
	tags        : [String],
	category    : String,
	linkCount   : { type: Number, default: 0}
});

Gif = mongoose.model('Gif', GifSchema);

xo.api('/api/gif', Gif);
