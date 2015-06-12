'use strict';
var vitreum = require('vitreum');
var express = require("express");
var app = express();
app.use(express.static(__dirname + '/build'));
require('node-jsx').install();

//Mongoose
var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/gifbin';
mongoose.connect(mongoUri);
mongoose.connection.on('error', function(){
	console.log(">>>ERROR: Run Mongodb.exe ya goof!");
});





app.get('*', function (req, res) {
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