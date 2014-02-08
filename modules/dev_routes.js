

app.get('/dropall', function(req,res){
	Gif.remove({}, function(){});
	Category.remove({}, function(){});
	res.send('dropped all');
});

app.get('/search/:attr/:val', function(req,res){
	var r = {};
	r[req.params.attr] = req.params.val;
	Gif.find(r , function(err, result){
		if(err) return res.render('oops.html');
		res.send(result);
	});
});
app.get('/addclick/:user/:link', function(req,res){
	Clicks.addClick(req.params.user, req.params.link, function(err, result){
		if(err) return res.send(500)
		res.send(200);
	});
});
app.get('/userclick/:user', function(req,res){
	Clicks.getByUser(req.params.user, function(err, result){
		if(err) return res.send(500)
		res.send(result);
	});
});



//Make sure all gifs in DB are using imgur
app.get('/updateAllImgur', function(req, res){
	Gif.find({}, function(err, gifs){
		async.map(gifs, function(gifModel, callback){
			console.log(gifModel.link);
			gifModel.validateImgur(callback);
		}, function(err, results){
			console.log('Done!', results);
			res.send(200, 'updated all');
		});

	});
})