var mongoose = require('mongoose');
var apigen = require('./apigen');
var imgur = require('./imgur.js');
imgur.setClientID('dd9999a685d25ee');


var GifSchema = mongoose.Schema({
	link        : String,
	created     : { type: Date, default: Date.now },
	user        : String,
	tags        : String,

	favouritedBy : [String],
	buckets      : {type : [String]},
	views       : { type: Number, default: 0},
	width       : { type: Number, default: 90},
	height       : { type: Number, default: 90},
});


GifSchema.pre('save', function(next){
	var self = this;

	var updateModel = function(err, img){
		if(err || !img) return next(err);

		self.link = img.link;
		self.width = img.width;
		self.height = img.height;
		self.views = img.views;
		return next();
	}
	if(!this.link) return next();


	var isImgur = this.link.indexOf('i.imgur.com') !== -1;
	if(!isImgur){
		return imgur.upload(this.link, updateModel);
	}else{
		return imgur.getData(this.imgurID, function(err, img){
			if(img) return updateModel(null, img);
			return next();
		});
	}
});

GifSchema.methods.updateViewCount = function(callback){

}


GifSchema.virtual('imgurID').get(function(){
	return this.link
		.replace('http://i.imgur.com/', '')
		.replace('https://i.imgur.com/', '')
		.replace('.gif','')
		.replace('.jpg','')
		.replace('.webm','')
		.replace('.gifv','');
});
GifSchema.virtual('imgLink').get(function(){
	return this.link.replace('.gif', 's.jpg');
});
GifSchema.virtual('gifvLink').get(function(){
	return this.link.replace('.gif', '.gifv');
});
GifSchema.virtual('webmLink').get(function(){
	return this.link.replace('.gif', '.webm');
});



var Gif = mongoose.model('Gif', GifSchema);


module.exports = {
	schema : GifSchema,
	model : Gif,
	generateRoutes : function(){
		apigen.add('/api/gifs', GifSchema, Gif);
	}
}
