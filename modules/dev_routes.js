

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



//Gen sample DB

var randArray = function(arr){
	return arr[Math.floor(Math.random()*arr.length)];
}

var genGifs = function(categories, count){
	count = count || 30;
	var result = [];

	_.times(count, function(){
		var category = randArray(categories);
		var link = randArray(["http://i.imgur.com/Mk76H.gif","http://i.imgur.com/asBJqIC.gif","http://i.imgur.com/KeWf4s9.gif","http://i.imgur.com/HDZS12B.jpg","http://i.imgur.com/WSmpayC.gif","http://i.imgur.com/cPIWd.gif","http://i.imgur.com/ifYUt.gif","http://i.imgur.com/oeXlZ.gif","http://i.imgur.com/fUxaoLK.gif","http://i.imgur.com/s5MkPOv.gif","http://i.imgur.com/0TxTN.gif","http://i.imgur.com/jgKpa.gif","http://i.imgur.com/EqMJ9.gif","http://i.imgur.com/3CbN9ho.gif","http://i.imgur.com/lnqGa3v.gif","http://i.imgur.com/3ZyTy.gif","http://i.imgur.com/DeeY8kp.gif","http://i.imgur.com/WVjq7rS.gif","http://i.imgur.com/oikxefF.gif","http://i.imgur.com/CFwqKVD.gif","http://i.imgur.com/GVm1Ufa.gif","http://i.imgur.com/fUjFW1T.gif","http://i.imgur.com/Ng2Hd1l.gif","http://i.imgur.com/guoze.gif","http://i.imgur.com/himZD0M.jpg","http://i.imgur.com/NiQUwQy.gif","http://i.imgur.com/ZmKOWND.gif","http://i.imgur.com/K0bUm.gif","http://i.imgur.com/06ZTQ.gif","http://i.imgur.com/TqWIAhM.gif","http://i.imgur.com/c9Ups.gif"]);
		result.push({
			user : randArray(['Scott', 'Jared', "Bill"]),
			link : link,
			staticLink : link.insert(link.lastIndexOf('.'), 's'),
			category : category.name,
			category_id : category.id,
			linkCount : _.random(0, 200)
		});
	});
	return result;
}



app.get('/genDB', [mw.getCategories], function(req, res){
	Gif.remove({}, function(){
		Gif.create(genGifs(res.categories), function(err){
			if(err) return res.send(500, 'oops');
			Gif.find({}, function(err, gifs){
				res.send(200, gifs);
			});
		});
	});
});

app.get('/genDB/:count', [mw.getCategories], function(req, res){
	Gif.remove({}, function(){
		Gif.create(genGifs(res.categories, req.params.count), function(err){
			if(err) return res.send(500, 'oops');
			Gif.find({}, function(err, gifs){
				res.send(200, gifs);
			});
		});
	});
})