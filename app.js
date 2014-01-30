var mongoUri = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/gifbin';
mongoose = require('mongoose');
mongoose.connect(mongoUri);
mongoose.connection.on('error', function(){
	console.log(">>>ERROR: Connect Mongodb ya goof!");
});

express = require("express");
GLOBAL.app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.static(__dirname + '/public'));



//Modules
mw            = require('./modules/middleware.js');
xo            = require('./modules/xo-node.js');


//Models
require('./modules/models/gif.js');
require('./modules/models/category.js');


//Categories
categories = ["Misc", "Nope", "Agreement", "Excited", "The Fuck?", "Fuck This", "Mind Blown"];


//Routes
app.get('/', [mw.getCategories], function (req, res) {
	Gif.find({}, function(err, gifs){
		if(err || !gifs) return res.send(500, 'whoops');
		res.render('home.html', {
			categories : JSON.stringify(res.categories),
			gifs : JSON.stringify(xo.clean(gifs))
		});
	});
});
app.get('/categories', [mw.getCategories],function (req, res) {
	Gif.find({}, function(err, gifs){
		if(err || !gifs) return res.send(500, 'whoops');
		res.render('home.html', {
			categories : JSON.stringify(res.categories),
			gifs : JSON.stringify(xo.clean(gifs))
		});
	});
});
app.get('/about', function (req, res) {
	res.render('about.html');
});


app.get('/edit/:gif_id', [mw.getCategories], function (req, res) {
	//return res.render('edit.html');

	Gif.findById(req.params.gif_id, function(err, gif){
		if(err || !gif) return res.send('sad');
		return res.render('edit.html', {
			categories : JSON.stringify(res.categories),
			gif : JSON.stringify(xo.clean(gif))
		});
	})
});
app.get('/add', [mw.getCategories], function (req, res) {
	res.render('edit.html', {
		categories : JSON.stringify(res.categories),
		gif : "{}"
	});
});


app.get('/category/:categoryName', function (req, res) {
	var r = {
		category : req.params.categoryName,
	};
	Gif.find(r, function(err, gifs){
		if(err || !gifs) return res.send(500, 'whoops');
		res.render('category.html', {
			gifs : JSON.stringify(xo.clean(gifs)),
			categoryName : req.params.categoryName
		});
	});
});
app.get('/user/:userName', function (req, res) {
	var r = {
		user : req.params.userName,
	};
	Gif.find(r, function(err, gifs){
		if(err || !gifs) return res.send(500, 'whoops');
		res.render('category.html', {
			gifs : JSON.stringify(xo.clean(gifs)),
			categoryName : req.params.userName || 'Misc'
		});
	});
});




//Admin

/*

app.get('/dropall', function(req,res){
	Gif.remove({}, function(){});
	res.send('dropped all');
});

app.get('/search/:attr/:val', function(req,res){
	var r = {};
	r[req.params.attr] = req.params.val;
	Gif.find(r , function(err, result){
		if(err) return res.send(500, 'whoops');
		res.send(result);
	});
});
*/

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

