//Globals
GLOBAL.fs      = require('fs');
GLOBAL._       = require('underscore');
GLOBAL.express = express = require("express");
GLOBAL.app     = express();
GLOBAL.ejs     = require('ejs');
GLOBAL.async   = require('async');

//Mongoose
mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/gifbin';
mongoose.connect(mongoUri);
mongoose.connection.on('error', function(){
	console.log(">>>ERROR: Run Mongodb.exe ya goof!");
});

//Express
app.engine('html', ejs.renderFile);
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

//Modules
mw   = require('./modules/middleware.js');
xo   = require('./modules/xo-node.js');

//Dev Stuff
dev  = require('./modules/dev_routes.js');


//Models
require('./modules/models/gif.js');
require('./modules/models/category.js');
require('./modules/models/clicks.js');



//Renders HTML file with layout.ejs
var render = function(res, htmlFile, vars){
	var tempRender = ejs.render(fs.readFileSync(__dirname + '/views/' + 'layout.ejs','utf8'), {
		body : fs.readFileSync(__dirname + '/views/' + htmlFile,'utf8'),
	});
	return res.end(ejs.render(tempRender, vars));
};

var showErrorPage = function(res){
	return render(res, 'oops.html');
};




//Routes
app.get('/', [mw.getCategories], function (req, res) {
	Gif.find({}, function(err, gifs){
		if(err || !gifs) return render(res, 'oops.html');
		return render(res, 'home.html', {
			categories : JSON.stringify(res.categories),
			gifs : JSON.stringify(gifs)
		});
	});
});
app.get('/all', function (req, res) {
	Gif.find({}, function(err, gifs){
		if(err || !gifs) return render(res, 'oops.html');
		render(res, 'all.html', {
			gifs : JSON.stringify(gifs)
		});
	});
});
app.get('/categories', [mw.getCategories],function (req, res) {
	Gif.find({}, function(err, gifs){
		if(err || !gifs) return render(res, 'oops.html');
		render(res, 'home.html', {
			categories : JSON.stringify(res.categories),
			gifs : JSON.stringify(gifs)
		});
	});
});
app.get('/about', function (req, res) {
	render(res, 'about.html');
});


app.get('/edit/:gif_id', [mw.getCategories], function (req, res) {
	//return render(res, 'edit.html');

	Gif.findById(req.params.gif_id, function(err, gif){
		if(err || !gif) return render(res, 'oops.html');;
		return render(res, 'edit.html', {
			categories : JSON.stringify(res.categories),
			gif : JSON.stringify(gif)
		});
	})
});
app.get('/add', [mw.getCategories], function (req, res) {
	render(res, 'edit.html', {
		categories : JSON.stringify(res.categories),
		gif : "{}"
	});
});


app.get('/category/:categoryName', function (req, res) {
	Category.findOne({name : req.params.categoryName}, function(err, category){
		var r = {
			category : req.params.categoryName,
		};
		Gif.find(r, function(err, gifs){
			if(err || !gifs) return render(res, 'oops.html');
			render(res, 'category.html', {
				gifs : JSON.stringify(gifs),
				categoryName : req.params.categoryName,
				categoryId : category.id
			});
		});
	});
});
app.get('/user/:userName', function (req, res) {
	var r = {
		user : req.params.userName,
	};
	Gif.find(r, function(err, gifs){
		if(err || !gifs) return render(res, 'oops.html');
		render(res, 'category.html', {
			gifs : JSON.stringify(gifs),
			categoryName : req.params.userName || 'Misc',
			categoryId : 'None'
		});
	});
});

app.get('/addclick/:user/:link', function(req,res){
	Clicks.addClick(req.params.user, req.params.link, function(err, result){
		if(err) return res.send(500)
		res.send(200);
	});
});


app.get('*', function(req,res){
	render(res, 'oops.html');
});

