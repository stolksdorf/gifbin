
exports.loadGif = function(req,res,next){
	console.log(req.params.gif_id);
	Gif.findOne({id: req.gif_id}, function(err, gif){
		console.log('tesfght', gif);
		if(err || !gif){ return next(); }
		res.gif = gif;
		next();
	});
};
