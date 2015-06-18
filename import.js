//Mongoose
var async = require('async');
var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/gifbin';
mongoose.connect(mongoUri);
mongoose.connection.on('error', function(){
	console.log(">>>ERROR: Run Mongodb.exe ya goof!");
});

var Gif = require('./server/gif.model.js');

if(process.argv[2] == 'drop'){
	Gif.model.remove({}, function(err) {
		console.log('collection removed')
		mongoose.connection.close();
	});
	return;
}




var fs = require('fs');
var gifs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));


async.map(gifs, function(gif, callback){
	var tempGif = new Gif.model(gif);
	console.log('importing ' + gif.link);
	tempGif.save(callback);
}, function(err, res){
	mongoose.connection.close();
	if(err){
		console.log('ERROR', err);
		return
	}
	console.log('DONE! Imported ' + gifs.length + ' gifs');
})

