var _ = require('lodash');

var initialUrl = null;

module.exports = {

	setInitialUrl : function(url){
		//TODO: parse out the query param
		//initialUrl = url;
	},

	getQuery : function(){
		if(typeof window === 'undefined') return initialUrl;

		if(document.location.search){
			var path = document.location.search;
			var query = _.object(_.map(path.substring(path.indexOf('?')+1).split('&'), function(part){
				return part.split('=');
			}));

			return decodeURIComponent(query.q);
		}
	},

	getImageFromUrl : function(){
		if(typeof window === 'undefined') return;

		if(document.location.search){
			var path = document.location.search;
			var query = _.object(_.map(path.substring(path.indexOf('?')+1).split('&'), function(part){
				return part.split('=');
			}));

			return decodeURIComponent(query.i);
		}
	},

	createSearchObject : function(query){
		var result = {
			buckets : [],
			users : [],
			tags : [],
			query : query
		};

		if(!query) return result;

		var searchTerms = _.chain(query.toLowerCase().split(' '))
			.map(function(term){
				return term.split(',')
			})
			.flatten()
			.filter(function(term){
				return term !== "";
			})
			.value();

		_.each(searchTerms, function(term){
			if(term.indexOf('user:') === 0){
				result.users.push(term.substring(5));
			}else if(term.indexOf('in:') === 0){
				result.buckets.push(term.substring(3));
			}else{
				result.tags.push(term)
			}
		});

		return result;
	},



}