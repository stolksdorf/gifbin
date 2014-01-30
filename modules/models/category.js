var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
	id          : String,
	name        : String,
	created     : { type: Date,    default: Date.now },
});

Category = mongoose.model('Category', CategorySchema);
xo.api('/api/category', Category);
