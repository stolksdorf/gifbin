var _ = require('lodash');
var CookieJar = require('gifbin/cookieJar.js');
var request = require('superagent');

var flux = require('pico-flux');

var Url = require('url');

var onBrowser = (typeof window !== 'undefined');
var serversideUserId;

var GIFBIN_USER_KEY = 'gifbin-user';

var Storage = {
	status : {
		errors : null,
		saving : false
	},

	buckets : require('./bucketData.js'),
	gifs : [],
	users : {},


	currentUser : null,
	currentUrl : ''
};



module.exports = flux.createStore({
	LOGIN : function(){
		var userName = prompt("Please enter your name","anon");
		if(userName){
			CookieJar.set(GIFBIN_USER_KEY, userName);
			Storage.currentUser = userName;
			this.emitChange();
		}
		return false;
	},
	LOGOUT : function(){
		CookieJar.remove(GIFBIN_USER_KEY);
		Storage.currentUser = null;
	},

	//Maybe remove
	SET_URL : function(url){
		if(onBrowser){
			// use rotuer navigate?
		}
		Storage.currentUrl = url;
	},

	SET_PENDING : function(){
		Storage.status.saving = true;
		Storage.status.errors = null;
	},
	SET_ERRORS : function(errors){
		Storage.status.saving = false;
		Storage.status.errors = errors;
	},
	SET_FINISHED : function(){
		Storage.status.saving = false;
		Storage.status.errors = false;
		return false;
	},

	UPDATE_GIF : function(gifData){
		console.log('UPDATING STORE', gifData.favs);
		var index = _.findIndex(Storage.gif, {id : gifData.id});
		Storage.gifs[index] = gifData;
	},
	REMOVE_GIF : function(gifId){
		Storage.gifs = _.reject(Storage.gifs, {id : gifId});
	},

},{

	init : function(initialData){
		var updateUsers = function(gif){
			var user = Storage.users[gif.user] || {
				name : gif.user,
				totalGifs : 0,
				topGif : gif
			}
			user.totalGifs += 1;
			if(user.topGif.views < gif.views){
				user.topGif = gif
			}
			Storage.users[gif.user] = user;
		};
		var updateBuckets = function(gif){
			_.each(gif.buckets, function(bucketId){
				if(Storage.buckets[bucketId]) Storage.buckets[bucketId].total += 1;
			})
		}

		Storage.gifs = _.sortBy(initialData.gifs, function(gif){
			updateUsers(gif);
			updateBuckets(gif);
			return -gif.views || 0;
		});

		Storage.currentUser = initialData.user;
		Storage.currentUrl = initialData.url;
	},


	setCurrentUrl : function(url){
		Storage.currentUrl = url;
		if(typeof window !== 'undefined'){
			window.history.replaceState(null,null,url);
		}
	},



	/** GETTERS **/

	getStatus : function(){
		return Storage.status
	},
	getBuckets : function(){
		return Storage.buckets;
	},
	getGifs : function(){
		return Storage.gifs;
	},
	getGif : function(id){
		return _.find(Storage.gifs, {id : id})
	},
	getUser : function(){
		return Storage.currentUser;
	},
	getUsers : function(){
		return Storage.users;
	},

	getQuery : function(){
		return Url.parse(Storage.currentUrl,true).query || {};
	},



	searchGifs : function(query){

console.log(query, Storage.gifs);

		if(!query) return Storage.gifs;

		var searchObj = createSearchObject(query);
		var _l = function(arr){
			return _.map(arr, function(i){ return i.toLowerCase()});
		}
		var passFav = function(searchObj, gif){
			if(!searchObj.favs.length) return true;
			return _.intersection(searchObj.favs, _l(gif.favs)).length;
		};
		var passBuckets = function(searchObj, gif){
			if(!searchObj.buckets.length) return true;
			return _.intersection(searchObj.buckets, _l(gif.buckets)).length;
		};
		var passUser = function(searchObj, gif){
			if(!searchObj.users.length) return true;
			return _.contains(searchObj.users, gif.user.toLowerCase());
		};
		var passTags = function(searchObj, gif){
			if(!searchObj.tags.length) return true;

			return _.every(searchObj.tags, function(tag){
				var exclude = false;
				if(tag[0] === '!'){
					exclude = true;
					tag = tag.substring(1);
				}
				var shouldReturn = gif.tags.toLowerCase().indexOf(tag) !== -1 || gif.buckets.join(' ').indexOf(tag) !== -1;
				return (exclude ? !shouldReturn : shouldReturn);
			});
		};

		return _.filter(Storage.gifs, function(gif){
			return passFav(searchObj, gif) &&
				passBuckets(searchObj, gif) &&
				passUser(searchObj, gif) &&
				passTags(searchObj, gif);
		})
	},




})






var createSearchObject = function(query){
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
	};


global._ = _;
