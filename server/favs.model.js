var mongoose = require('mongoose');
var apigen = require('./apigen');

var FavsSchema = mongoose.Schema({

	user : String,
	gifList : { type : [String] }
});


var Favs = mongoose.model('Favs', FavsSchema);

module.exports = {
	schema : FavsSchema,
	model : Favs,
	generateRoutes : function(app){

		var mw = apigen.add('/api/favs', FavsSchema, Favs);



		app.get('/api/favs/:user', function(req, res){

		})


	}
}
