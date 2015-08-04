var mongoose = require('mongoose');
var apigen = require('./apigen');
var imgur = require('./imgur.js');
imgur.setClientID('dd9999a685d25ee');


var GifSchema = mongoose.Schema({
	originalLink : String,
	link : String,
	imgurID     : String,
	created     : { type: Date, default: Date.now },
	user        : String,
	tags        : String,

	buckets     : {type : [String]},
	views       : { type: Number, default: 0},
	width       : { type: Number, default: 90},
	height      : { type: Number, default: 90},
});


GifSchema.pre('save', function(next){
	var self = this;

	var updateModel = function(err, img){
		if(err || !img) return next(err);

		self.imgurID = img.id;
		self.width   = img.width;
		self.height  = img.height;
		self.views   = img.views;
		return next();
	}

	//Remove?
	if(!this.link) return next();

	//TODO: Switch over to using original Link

	//Handle all three cases
	//1) Non imgur first time
	//2) imgur first time
	//3) imgur non-first

	//Extrac toout the imgur ID to use for getting the get


	var isImgur = this.link.indexOf('i.imgur.com') !== -1;
	if(!isImgur){
		return imgur.upload(this.link, updateModel);
	}else{

		if(!this.imgurID){
			this.imgurID = this.link.replace('http://', '').replace('https://', '').replace('i.imgur.com/', '').replace('.gif', '');
		}

		return imgur.getData(this.imgurID, function(err, img){
			if(err) console.log('issue getting data');
			if(img) return updateModel(null, img);
			return next();
		});
	}
});

GifSchema.methods.updateViewCount = function(callback){

}

GifSchema.virtual('gifLink').get(function(){
	return 'https://i.imgur.com/' + this.imgurID + '.gif';
});
GifSchema.virtual('imgLink').get(function(){
	return 'https://i.imgur.com/' + this.imgurID + 's.jpg';
});
GifSchema.virtual('gifvLink').get(function(){
	return 'https://i.imgur.com/' + this.imgurID + '.gifv';
});
GifSchema.virtual('webmLink').get(function(){
	return 'https://i.imgur.com/' + this.imgurID + '.webm';
});



var Gif = mongoose.model('Gif', GifSchema);


module.exports = {
	schema : GifSchema,
	model : Gif,
	generateRoutes : function(){
		apigen.add('/api/gifs', GifSchema, Gif);
	}
}
