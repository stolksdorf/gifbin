

//Admin




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




imgur = require('imgur-node-api'),


imgurClientId = 'dd9999a685d25ee';
imgurClientSecret = '463d373639c42d66a0190bea7156acfb01b0c188';


imgur.setClientID(imgurClientId);




app.get('/imgur/:url', function(req, res){

	//var img_url = "http://sinsip.com/Jl.jpg";
	var img_url = 'http://mashable.com/wp-content/uploads/2013/07/Dr.-Who.gif';

	imgur.upload(img_url,function(err,img){
		if(err || !img) return res.send(500, err);
		console.log(img.data);
		res.send(200, img.data)
	});

});