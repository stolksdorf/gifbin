/*

	how to use

	node import.js drop
	- removes all gifs

	node import.js clean [file]
	- creates a cleaned up version of the file

	node import.js [file]
	- imports that json of gifs




*/
var async = require('async');
var _ = require('underscore');
var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/gifbin';
mongoose.connect(mongoUri);
mongoose.connection.on('error', function(){
	console.log(">>>ERROR: Run Mongodb.exe ya goof!");
});

var fs = require('fs');

var Gif = require('./server/gif.model.js');

if(process.argv[2] == 'drop'){
	Gif.model.remove({}, function(err) {
		console.log('collection removed')
		mongoose.connection.close();
	});
	return;
}


if(process.argv[2] == 'clean'){
	var gifs = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));

	var cleaned = _.reduce(gifs, function(r, gif){

		if(gif.link){
			var link = this.link;
			var tags = gif.tags || []


			r.push({
				created : gif.created,
				tags : tags.join(', '),
				user : gif.user,
				buckets : ['unknown'],
				link : gif.link
			})
		}
		return r;
	}, [])

	fs.writeFileSync('cleaned.json', JSON.stringify(cleaned, null, '\t'));
	mongoose.connection.close();

	console.log('DONE');

	return;

}





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

