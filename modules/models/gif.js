var mongoose = require('mongoose');
var imgur = require('imgur-node-api');

imgur.setClientID('dd9999a685d25ee');


String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};



var GifSchema = mongoose.Schema({
	link        : String,
	staticLink  : String,
	created     : { type: Date,    default: Date.now },
	user        : String,
	tags        : [String],
	category_id : String,
	category    : String,
	linkCount   : { type: Number, default: 0}
});


GifSchema.methods.validateImgur = function(callback){
	var self = this;
	var isImgur = this.link.indexOf('i.imgur.com') !== -1;
	if(!isImgur){
		return imgur.upload(this.link, function(err, img){
			if(err || !img) return res.send(500, err);
			self.link = img.data.link;
			return self.generateStaticLink(callback);
		});
	}
	return this.generateStaticLink(callback);
};

GifSchema.methods.generateStaticLink = function(callback){
	if(this.link) this.staticLink = this.link.insert(this.link.lastIndexOf('.'), 's');
	return this.save(callback);
}



Gif = mongoose.model('Gif', GifSchema);
xo.api('/api/gif', GifSchema, Gif, {
	post : [function(req, res, next){
		if(req.model){
			return req.model.validateImgur(next);
		}
		return next();
	}]
});
