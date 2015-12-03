var _ = require('lodash');
var UrlPattern = require('url-pattern');
var Url = require('url');

var onBrowser = (typeof window !== 'undefined');
var hasHistorySupport = !!(typeof window !== 'undefined' && window.history && window.history.pushState);


//Setup a global event that fires whenever the history changes
if(onBrowser){
	window.onHistoryChange = function(){};
	window.onpopstate = function(){
		window.onHistoryChange();
	}
}

var Router = function(context, routes, rootPath){
	rootPath = rootPath || '';
	var router = {
		routes : {},
		addRoute : function(path, fn){
			this.routes[path] = {
				pattern : new UrlPattern(rootPath + path),
				fn : fn
			}
			return this;
		},

		redirect : function(path){
			Router.redirect(path);
			return this.match(path);
		},

		match : function(path){
			if(!path && onBrowser){
				path = window.location.pathname;
			}
			var parts = Url.parse(path, true);
			path = parts.pathname;
			// strip query string
			var query;
			if (path.indexOf('?') > -1) {
				query = _.object(_.map(path.substring(path.indexOf('?')+1).split('&'), function(part){
					return part.split('=');
				}));
				path = path.substring(0, path.indexOf('?'));

			}
			// strip trailing slash
			if (path.slice(-1) == '/') {
				path = path.slice(0, -1);
			}
			var params = {};
			var matchedRoute = _.find(this.routes, function(route){
				params = route.pattern.match(path);
				return params;
			});

			params = params || {};

			params.query = query || {};

			if(matchedRoute && (typeof matchedRoute.fn ==='function')){
				params.url = path;
				return matchedRoute.fn.call(context, params);
			}
			return matchedRoute && matchedRoute.fn;
		},
	};

	for(var route in routes){
		router.addRoute(route, routes[route]);
	}
	return router;
};

Router.navigate = function(path, forceReload){
	try{
		if(hasHistorySupport && !forceReload){
			history.pushState(null, null, path);
			window.onHistoryChange();
		}else if(onBrowser){
			window.location.href = path;
		}
	}catch(e){
		console.error(e);
	}
};

Router.redirect = function(path){
	if(hasHistorySupport){
		history.pushState(null, null, path);
	}else if(onBrowser){
		window.location.href = path;
	}
};

Router.reload = function(force) {
	window.location.reload(force);
};

module.exports = Router;
