var Gif = require('./gif.model.js');
var async = require('async');


module.exports = {
	addRoutes : function(app){

		//DROP
		app.get('/api/admin/drop', function(req, res){
			if(req.query && req.query.admin_key == process.env.ADMIN_KEY){
				Gif.model.remove({}, function(err) {
					res.status(200).send('ok!');
				});

			}else{
				return res.status(401).send('Access denied');
			}
		});


		//IMPORT
		app.post('/api/admin/import', function(req, res){
			if(req.query && req.query.admin_key == process.env.ADMIN_KEY){
				async.map(req.body, function(gif, callback){
					var tempGif = new Gif.model(gif);
					console.log('importing ' + gif.originalLink);
					tempGif.save(callback);
				}, function(err){
					res.status(200).send('ok!')
				});
			}else{
				return res.status(401).send('Access denied');
			}
		});

		//Export
		app.get('/api/admin/export', function(req, res){
			if(req.query && req.query.admin_key == process.env.ADMIN_KEY){
				Gif.model.find({}, function(err, gifs){
					return res.send( JSON.stringify(gifs));
				});
			}else{
				return res.status(401).send('Access denied');
			}
		})

	}

}