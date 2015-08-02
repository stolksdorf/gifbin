var _ = require('underscore');
var expressServer;

var setupSchema = function(Schema){
	Schema.set('versionKey', false);
	Schema.set('toJSON', { virtuals: true });
	Schema.set('toObject', { virtuals: true });

	Schema.virtual('id').get(function(){
		return this._id.toHexString();
	});
	Schema.options.toJSON.transform = function (doc, ret, options) {
		delete ret._id;
		delete ret.__t;
		delete ret.__v;
	}
	Schema.options.toObject.transform = function (doc, ret, options) {
		delete ret._id;
		delete ret.__t;
		delete ret.__v;
	}
	return Schema;
}

var createResourceEndpoint = function(endpoint, Schema, Model, middleware, handleError){
	if(!expressServer){
		console.error('ERROR apigen : Express instance not setup. To fix apigen.use(expressApp)');
		return;
	}

	Schema = setupSchema(Schema);

	middleware = middleware || [];
	var mw = {
		get  : middleware,
		post : middleware,
		put  : middleware,
		del  : middleware
	};

	if(!_.isArray(middleware)){
		mw.get  = middleware.get  || [];
		mw.post = middleware.post || [];
		mw.put  = middleware.put  || [];
		mw.del  = middleware.del  || [];
	}

	handleError = handleError || function(err, req, res){
		console.log('ERROR:', err);
		res.status(500).send(err);
	};



	var buildQuery = function(query){
		var result = Model.find();
		if(query.sort){
			result.sort(query.sort);
			delete query.sort;
		}
		if(query.page && query.limit){
			result.skip(query.limit * (query.page - 1));
			delete query.page;
		}
		if(query.limit){
			result.limit(query.limit);
			delete query.limit;
		}
		_.each(query, function(vals, field){
			if(!_.isArray(vals)) vals = [vals];
			_.each(vals, function(val){
				if(val.indexOf('>') === 0){
					result.where(field).gt(val.slice(1));
				} else if(val.indexOf('<') === 0){
					result.where(field).lt(val.slice(1));
				}else{
					result.where(field).equals(val);
				}
			});
		});
		return result;
	};


	//Setup Middleware to use in routes
	mw.queryModels = function(req,res,next){
		var query = buildQuery(req.query);

		query.exec(function(err, models){
			if(err) return handleError(err, req, res);
			req.models = models;
			return next();
		});
	};
	mw.findModel = function(req,res,next){
		Model.findById(req.params.id, function(err, obj){
			if(err) return handleError(err, req, res);
			req.model = obj;
			return next();
		});
	};
	mw.createModel = function(req,res,next){
		req.model = new Model(req.body);
		return next();
	};
	mw.updateModel = function(req,res,next){
		Model.findById(req.params.id, function(err, obj){
			if(!obj || err) return handleError(err, req, res);
			req.model = _.extend(obj, req.body);
			return next();
		});
	};


	//Collection
	expressServer.get(endpoint, mw.queryModels, mw.get, function(req,res){
		if(!req.models) return handleError('no collection', req, res);
		return res.status(200).send(req.models);
	});

	//Model
	expressServer.get(endpoint + '/:id', mw.findModel, mw.get, function(req,res){
		if(!req.model) return handleError('no model', req, res);
		return res.status(200).send(req.model);
	});

	expressServer.delete(endpoint + '/:id', mw.findModel, mw.del, function(req,res){
		if(!req.model) return handleError('no model', req, res);
		req.model.remove(function(err){
			if(err) return handleError(err, req, res);
			return res.status(200).send();
		});
	});

	expressServer.post(endpoint, mw.createModel, mw.post, function(req, res){
		if(!req.model) return handleError('no model', req, res);
		req.model.save(function(err, obj){
			if(err) return handleError(err, req, res);
			return res.status(200).send(obj);
		});
	});

	expressServer.put(endpoint + '/:id', mw.updateModel, mw.put, function(req,res){
		if(!req.model) return handleError('no model', req, res);
		req.model.save(function(err, obj){
			if(err) return handleError(err, req, res);
			return res.status(200).send(obj);
		});
	});

	return mw;
}


module.exports = {
	use : function(expressInstance){
		expressServer = expressInstance;
	},
	add : createResourceEndpoint
}