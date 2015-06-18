var mongoose = require('mongoose');
var apigen = require('./apigen');
var imgur = require('imgur-node-api');
imgur.setClientID('dd9999a685d25ee');


var GifSchema = mongoose.Schema({
	link        : String,
	created     : { type: Date, default: Date.now },
	user        : String,
	tags        : String,

	favouritedBy : [String],
	buckets      : {type : [String], default : ['groos']},
	views       : { type: Number, default: 0},

	//Depreacited
	//linkCount   : { type: Number, default: 0},
	//category    : String
});


GifSchema.methods.validateImgur = function(callback){
	var self = this;
	var isImgur = this.link.indexOf('i.imgur.com') !== -1;
	if(!isImgur){
		return imgur.upload(this.link, function(err, img){
			if(err || !img) return callback(err);
			self.link = img.data.link;
			return self.save(callback)
		});
	}
};

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
		apigen.add('/api/gifs', GifSchema, Gif, {
			post : [function(req, res, next){
				if(req.model){
					return req.model.validateImgur(next);
				}
				return next();
			}]
		});
	}
}
