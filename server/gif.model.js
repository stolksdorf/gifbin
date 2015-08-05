var mongoose = require('mongoose');
var apigen = require('./apigen');
var imgur = require('./imgur.js');
imgur.setClientID('dd9999a685d25ee');


var GifSchema = mongoose.Schema({
	originalLink : String,
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

	//Sanity Check
	if(!this.originalLink) return next();

	var isImgur = this.originalLink.indexOf('i.imgur.com') !== -1;
	if(!isImgur){
		return imgur.upload(this.originalLink, updateModel);
	}else{

		if(!this.imgurID){
			this.imgurID = this.originalLink.replace('http://', '').replace('https://', '').replace('i.imgur.com/', '').replace('.gif', '');
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
