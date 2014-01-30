;(function(){
	var map = function(obj, fn){
		var result = [];
		for(var key in obj){
			if(obj.hasOwnProperty(key)){ result.push(fn(obj[key], key)); }
		}
		return result;
	};
	var reduce = function(obj, fn, memo){
		for(var key in obj){
			if(obj.hasOwnProperty(key)){ memo = fn(memo, obj[key], key); }
		}
		return memo;
	};
	var extend = function(){
		var result = {};
		for(var i in arguments){
			var obj = arguments[i];
			for(var propName in obj){
				if(obj.hasOwnProperty(propName)){ result[propName] = obj[propName]; }
			}
		}
		return result;
	};

	//Better ajax call, no jQuery needed
	var xo_ajax = function(self, method, callback, data){
		callback = callback || function(){};
		data     = extend(self.attributes(), data);
		var typeMap = {
			'fetch'  : 'GET',
			'save'   : self.id ? 'PUT' : 'POST',
			'delete' : 'DELETE'
		};
		var done = function(res){
			self.set(res);
			self.trigger(method, self);
			return callback(undefined, res);
		}

		self.trigger('before:'+method, self);
		if(!self.URL) return done(data);

		var url = self.URL() + (self.id ? "/" + self.id : "")


		/*
		var req = new XMLHttpRequest();
		req.open(typeMap[method], url, true);
		req.onreadystatechange = function(){
			if(req.readyState != 4) return;
			if(req.status != 200){
				self.trigger('error', self, req.responseText);
				return callback(req.responseText);
			}
			done(req.responseText);
		};
		req.send(JSON.stringify(data));
		*/

		$.ajax({
			url : url,
			type : typeMap[method],
			data: data,
			error : function(req){
				self.trigger('error', self, req.responseText);
				return callback(req.responseText);
			},
			success : function(res){
				done(res);
				return this;
			},
		})
	}






	xo = {};

	xo.elementWrapper = $ || function(e){return e;};

	xo.view = Archetype.extend({
		view      : undefined,
		schematic : undefined,

		initialize : function(model){
			this.model = model;
			this.dom = {};
			if(this.view) this.once('created', this.injectInto.bind(this));
			return this;
		},
		injectInto : function(target, prepend){
			if(target.length) target = target[0];
			if(typeof this.schematic === 'string'){
				var schematicElement = document.querySelector('[xo-schematic="' + this.schematic + '"]');
				if(!schematicElement){throw 'xo-view: Could not find schematic with name "' + this.schematic + '"';}
				schematicElement = schematicElement.cloneNode(true);
				schematicElement.removeAttribute("xo-schematic");
				this.dom.view = target.appendChild(schematicElement);
			} else if(typeof this.schematic !== 'undefined'){
				this.dom.view = this.schematic.cloneNode(true);
				if(prepend){ $(target).prepend(this.dom.view) }
				else{ this.dom.view = target.appendChild(this.dom.view)}
			}
			if(this.view){
				this.dom.view = document.querySelector('[xo-view="' + this.view + '"]');
				if(!this.dom.view){throw 'xo-view: Could not find view with name ' + this.view;}
			}
			var elements = this.dom.view.querySelectorAll('[xo-element]');
			for(var i =0; i < elements.length; i++){
				this.dom[elements[i].getAttribute('xo-element')] = xo.elementWrapper(elements[i]);
			}

			this.dom.view = xo.elementWrapper(this.dom.view);

			this.render();
			this.trigger('render');
			return this;
		},
		remove : function(){
			this.trigger('remove');
			if(this.dom.view) this.dom.view.remove();
			this.off();
			return this;
		},
		render : function(){
			return this;
		}
	});

	/*
		MODEL
	 */
	xo.model = Archetype.extend({
		URL : undefined, //function(){},

		initialize : function(obj){
			this.set(obj);
			this.on('delete', this.off);
			return this;
		},
		set : function(key, value){
			var changes = {};
			changes[key] = value;
			var hasChanges = false;
			if(typeof key === 'object') changes = key;

			for(var key in changes){
				var val = changes[key];
				if(this[key] !== val){
					this[key] = val;
					hasChanges = true;
					this.trigger('change:' + key, val);
				}
			}
			if(hasChanges) this.trigger('change');
			return this;
		},
		onChange : function(attrName, evt){
			if(typeof attrName === 'object'){
				for(var k in attrName){
					this.onChange(k, attrName[k]);
				}
				return this;
			}
			this.on('change:' + attrName, evt);
			evt(this[attrName]);
			return this;
		},
		attributes : function(){
			return JSON.parse(JSON.stringify(this));
		},

		//ajax methods
		save : function(data, callback){
			if(typeof data === 'function') callback = data;
			xo_ajax(this, 'save', callback, data);
			return this;
		},
		fetch : function(callback){
			xo_ajax(this, 'fetch', callback);
			return this;
		},
		delete : function(callback){
			xo_ajax(this, 'delete', callback);
			return this;
		},
	}),


	/*
		COLLECTION
	 */
	xo.collection = Archetype.extend({
		URL : undefined, //function(){},
		model  : xo.model,
		models : [],

		initialize : function(objs){
			this.set(objs);
			this.URL       = this.model.URL || this.URL;
			this.model.URL = this.model.URL || this.URL;

			return this;
		},
		set : function(objs){
			this.models = [];
			for(var i in objs){
				this.add(objs[i])
			}
			return this;
		},
		get : function(id){
			return reduce(this.models, function(result, model){
				if(model.id === id) result = model;
				return result;
			});
		},
		remove : function(arg){
			id = arg.id || arg; //handles models and raw ids
			for(var i in this.models){
				if(id == this.models[i].id){
					this.trigger('remove', this.models[i]);
					this.models.splice(i,1);
				}
			}
			return this;
		},
		add : function(obj){
			if(!this.model.isPrototypeOf(obj)) obj = this.model.create(obj);
			obj.on('delete', function(obj){
				this.remove(obj);
			}.bind(this));

			this.models.push(obj);
			this.trigger('add', obj);
			return obj;
		},
		//remove
		each : function(fn){
			return map(this.models, fn);
		},
		attributes : function(){
			return JSON.parse(JSON.stringify(this.models));
		},

		//Ajax methods
		fetch : function(callback){
			//this.URL should be fine
			xo_ajax(this, 'fetch', callback);
			//xo_ajax(this, 'fetch', callback)
			return this;
		},
		delete : function(callback){
			//delete call on each model
			xo_ajax(this, 'delete', callback);
			return this;
		},
		save : function(callback){
			//save call on each model
			xo_ajax(this, 'save', callback);

			/*
			var count = this.models.length, self = this;
			self.trigger('before:save');
			map(this.models,function(model){
				model.save(function(){
					if(--count === 0){
						self.trigger('save');
						callback && callback();
					}
				});
			});
	*/

			return this;
		},
	});

	xo.router = Archetype.extend({
		routes : {},
		initialize : function(routes){
			map(routes, function(fn, path){this.add(path,fn)}.bind(this));
			window.addEventListener('hashchange', this.route);
			window.addEventListener('load', this.route);
			return this;
		},
		navigate : function(path){
			window.location.hash = path;
			return this;
		},
		add : function(path, fn){
			path = path.replace('*', '(.*?)').replace(/(\(\?)?:\w+/g, '([^\/]+)') + "$";
			this.routes[path] = fn;
			return this;
		},
		route : function(){
			var URL = location.hash.slice(1) || '';
			for(var path in this.routes){
				var args = (new RegExp(path)).exec(URL);
				if(args) this.routes[path].apply(this, args.slice(1));
			}
		},
	});



})();





