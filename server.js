'use strict';
var vitreum = require('vitreum');
var express = require("express");
var app = express();
app.use(express.static(__dirname + '/build'));
require('node-jsx').install();


if(process.env.NODE_ENV == 'development'){
	vitreum.cacheBusting([
		'./client/**/*.jsx',
		'./client/**/*.js',
		'./node_modules/gifbin/**/*.jsx',
		'./node_modules/gifbin/**/*.js'
	])
}


app.get('/', function (req, res) {
	vitreum.render({
		page: './build/gifbin/bundle.hbs',
		
		prerenderWith : './client/gifbin/gifbin.jsx',
		initialProps: {
			url: req.originalUrl
		},
	}, function (err, page) {
		return res.send(page)
	});
});


var port = process.env.PORT || 8000;

app.listen(port);
console.log('Listening on localhost:' + port);