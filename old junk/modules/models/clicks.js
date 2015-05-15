var mongoose = require('mongoose');

var ClicksSchema = mongoose.Schema({
	id          : String,
	gif_id      : String,
	user        : String,
	count       : { type: Number, default: 0}
});


ClicksSchema.statics.addClick = function(user, gif_id, callback){
	this.findOne({user : user, gif_id : gif_id}, function(err, click){
		console.log('click', click);
		if(err) return;
		if(!click) click = new Clicks({user : user, gif_id : gif_id});
		click.count = click.count + 1;
		click.save(function(err){
			callback(err);
		});
		console.log(click);
	});
}

ClicksSchema.statics.getByUser = function(user, callback){
	this.find({user : user}, function(err, clicks){
		return callback(err, clicks);
	});
}


Clicks = mongoose.model('Clicks', ClicksSchema);
