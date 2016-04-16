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
			favs : [],
			tags : [],
			query : query
		};
		if(!query) return result;

		var searchTerms = _.chain(query.toLowerCase().split(' ')).map(function(term){
			return term.split(',')
		}).flatten().filter().value();

		var commands = {
			'by:' : result.users,
			'fav:' : result.favs,
			'in:' : result.buckets,
		};

		_.each(searchTerms, function(term){
			var matchedCommand = _.find(_.keys(commands), function(cmd){
				return term.indexOf(cmd) === 0
			})
			if(matchedCommand){
				commands[matchedCommand].push(term.replace(matchedCommand, ''))
			}else{
				result.tags.push(term);
			}
		})
		return result;
	},



}