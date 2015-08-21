'use strict';
var vitreum = require('vitreum');
var express = require("express");
var bodyParser = require('body-parser')
var app = express();
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.json());
require('node-jsx').install();

var apigen = require('./server/apigen.js');
apigen.use(app);

//Admin panel creds
var adminUser = process.env.ADMIN_USER || 'john';
var adminPassword = process.env.ADMIN_PASS || 'secret';



if (process.env.NODE_ENV == 'development'){
	vitreum.cacheBusting([
		'./client/**/*.jsx',
		'./client/**/*.js',
		'./node_modules/gifbin/**/*.jsx',
		'./node_modules/gifbin/**/*.js',
		'./node_modules/palette/**/*.jsx',
		'./node_modules/palette/**/*.js',
	])
}



//Mongoose
var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/gifbin';
mongoose.connect(mongoUri);
mongoose.connection.on('error', function(){
	console.log(">>>ERROR: Run Mongodb.exe ya goof!");
});


//Models
var Gif = require('./server/gif.model.js')
Gif.generateRoutes();


//Admin route
var auth = require('basic-auth');
app.get('/admin', function(req, res){
	var credentials = auth(req)

	if (!credentials || credentials.name !== adminUser || credentials.pass !== adminPassword) {
		res.setHeader('WWW-Authenticate', 'Basic realm="example"')
		return res.status(401).send('Access denied')
	}

	Gif.model.find({}, function(err, gifs){
		vitreum.render({
			page: './build/admin/bundle.hbs',
			prerenderWith : './client/admin/admin.jsx',
			initialProps: {
				url: req.originalUrl,
				gifs : gifs
			},
		}, function (err, page) {
			return res.send(page)
		});
	});
})


//Routes
app.get('*', function (req, res) {

	Gif.model.find({}, function(err, gifs){

		if(err || !gifs) return console.log('err', err);

		vitreum.render({
			page: './build/gifbin/bundle.hbs',
			prerenderWith : './client/gifbin/gifbin.jsx',
			initialProps: {
				gifs : gifs,
				url: req.originalUrl
			},
		}, function (err, page) {
			return res.send(page)
		});
	})
});


var port = process.env.PORT || 8000;

app.listen(port);
console.log('Listening on localhost:' + port);