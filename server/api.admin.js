module.exports = {
	addRoutes : function(app){

		app.get('/api/admin/drop', function(req, res){
			if(req.query && req.query.admin_key == process.env.ADMIN_KEY){

				console.log('YOU IN');


			}else{
				return res.status(401).send('Access denied');
			}
		})

	}

}