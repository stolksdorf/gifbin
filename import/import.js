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

var Gif = require('../server/gif.model.js');

if(process.argv[2] == 'drop'){
	Gif.model.remove({}, function(err) {
		console.log('collection removed')
		mongoose.connection.close();
	});
	return;
}


//Category map
var category_map = {
	"52e9d0726220850200343d6b" : ['unknown'],//"Misc",
	"52e9d1f06220850200343d6d" : ['unknown'],//"Obvious Flaw",
	"52e9db866220850200343d70" : ['unknown'],//"Sloths",
	"52eac4da2d446b020026adf2" : ['unknown'],//"Sad",
	"52eac5982d446b020026adf4" : ['excited'],//"Excited",
	"52ebd7b2f43a0702004f290a" : ['approve'],//"Approve",
	"52ebdd1cf43a0702004f290c" : ['unknown'],//"Scott",
	"52ebddb5f43a0702004f290e" : ['unknown'],//"Eyy",
	"52ebdeecf43a0702004f2912" : ['disgust'],//"Disgust",
	"52ebdfbff43a0702004f2914" : ['mind_blown'],//"Mind Blown",
	"52ebe5b7f43a0702004f2918" : ['sass'],//"Sass",
	"52ec068d71632602007df255" : ['aw_yis'],//"Haters Gunna Hate",
	"52ed0da2ffbbe80200aa1890" : ['unknown'],//"Fap",
	"52ed109dffbbe80200aa1897" : ['frustration'],//"Frustration",
	"52ed3786d4a355020088603e" : ['aw_yis'],//"Badass",
	"52f7d2ac62cd5d02005d0fad" : ['unknown'],//"Fluffy",
	"52f7df8b62cd5d02005d0fb5" : ['unknown'],//"Sarcasm",
	"531a2d3c60395302007a4907" : ['unknown'],//"Oh You",
	"532347fdd5acd902006e9508" : ['mind_blown'],//"Hope",
	"5335e843cc2cb802004692c5" : ['wat'],//"Shocked",
	"534b627ae1b1c2020050a9f0" : ['wat'],//"Oh Shit",
	"5390891493b8ca0200a996b2" : ['unknown'],//"Majestic",
	"542f056507ee650200aa4d7b" : ['frustration'],//"No",
	"54c95f0ed3dce003006433fc" : ['unknown'],//"Waiting",
	"54fd278e0995e40300f67c0c" : ['excited'],//"Fuck yea",
	"552c0a3d3812ef030062024e" : ['wat'],//"Confused",
	"55a0313675bc720300c57f04" : ['wat'],//"Awkward",
};










if(process.argv[2] == 'clean'){
	var gifs = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));

	var cleaned = _.reduce(gifs, function(r, gif){

		if(gif.link){
			var link = this.link;
			var tags = gif.tags || []

			r.push({
				created : gif.created,
				tags : tags.join(', '),
				user : gif.user || 'anon',
				buckets : category_map[gif.category_id] || ['unknown'],
				originalLink : gif.link.replace('.jpg', '.gif')
			})
		}
		return r;
	}, [])

	fs.writeFileSync('cleaned.json', JSON.stringify(cleaned, null, '\t'));
	mongoose.connection.close();

	console.log('DONE');

	return;

}




/*

var gifs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));


async.map(gifs, function(gif, callback){
	var tempGif = new Gif.model(gif);
	console.log('importing ' + gif.originalLink);

	tempGif.save(callback);
}, function(err, res){
	mongoose.connection.close();
	if(err){
		console.log('ERROR', err);
		return
	}
	console.log('DONE! Imported ' + gifs.length + ' gifs');
})
*/
