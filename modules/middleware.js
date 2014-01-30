
exports.loadGif = function(req,res,next){
	Gif.findOne({id: req.gif_id}, function(err, gif){
		if(err || !gif){ return next(); }
		res.gif = gif;
		next();
	});
};

exports.getCategories = function(req,res,next){
	/*Category.find({}, 'name', function(err, categories){
		res.categories = _.map(categories, function(category){
			return category.name;
		});
		next();
	});*/
	Category.find({}, function(err, categories){
		if(err || !categories) return res.render('oops.html');
		res.categories = xo.clean(categories);
		next();
	});
};